# -*- coding: utf-8 -*-
import logging
import pprint
import json
import base64
import requests
from odoo import fields, http, models
from odoo.http import request
from odoo.tools.image import image_data_uri
class FrontendContact(http.Controller):
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self, **kw):
        _logger = logging.getLogger("frontend_contact.frontend_contact")

        contact_per_page = 10

        if 'current_page' not in request.session:
            request.session['current_page'] = 1

        current_page = request.session['current_page']

        element = ['name', 'mobile']
        tableau = paginaTable(element, "", [], None, None, "")

        pagesOffset = getOffset(tableau, contact_per_page)

        offset = (current_page - 1) * contact_per_page

        contact = paginaTable(element, "", [], contact_per_page, offset, "")

        pages = LimitButtonPages(pagesOffset + 1, current_page)

        request.session['current_page'] = current_page

        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'pages': pages})

    @http.route('/frontend_contact/pagination/etiquette', website=True, auth='user')
    def searching(self, **kw):
        logger = logging.getLogger("frontend_contact.frontend_contact")
        contact_per_page = 10
        term = request.params.get('term')
        badge = request.httprequest.args.getlist('badge[]')
        direction = request.params.get('direction')
        element = ['name', 'mobile']
        filter = request.params.get('filter')
        nextPage = request.params.get('page')
        if nextPage is not None and nextPage != "":
            nextPage = int(nextPage)
        logger.info(request.httprequest.args)

        limitOffset = getOffset(paginaTable(element, term, badge, None, None, ""), contact_per_page)
        current_page = get_current_page(direction, limitOffset, nextPage)

        offset = (current_page - 1) * contact_per_page
        contactTable = paginaTable(element, term, badge, contact_per_page, offset, filter)

        pages = LimitButtonPages(limitOffset + 1, current_page)

        response = {
            'pages': pages,
            'cNom': contactTable.mapped('name'),
            'cMobile': contactTable.mapped('mobile'),
            'cImg': ([image_data_uri(image) for image in contactTable.mapped('avatar_128')]),#fonctionne pas comme je veux
        }

        return json.dumps(response)

    @http.route('/frontend_contact/contact/devis', website=True, auth='user')
    def devi(self, **kw):
        logger = logging.getLogger("frontend_contact.frontend_contact")
        cName = request.params.get('name')
        partner = request.env['res.partner'].search([('name', '=', cName)])
        if partner:
            devis = request.env['sale.order'].search([('partner_id', '=', partner.id)])
            date_orders_str = [order.strftime('%Y-%m-%d %H:%M:%S') for order in devis.mapped('date_order')]
            response = {
                "name": devis.mapped('name'),
                "date": date_orders_str,
                "seller": devis.mapped('user_id').mapped('name'),
                "price": devis.mapped('amount_total'),
            }
            return json.dumps(response)
        else:
            return None

    @http.route('/contact', methods=['POST'] ,type='json', auth="none", cors="*")
    def route_contact(self):
        contacts = request.env['res.partner'].sudo().search([])
        contact_list = [{'name': contact.name, 'mobile': contact.mobile} for contact in contacts]
        return {'status': 200, 'response': contact_list, 'message': 'Success'}

def getOffset(contacts, cpp):
    cpt = 1
    for contact in contacts:  # count how many contact have contacts
        cpt += 1
    return (cpt/cpp)


def LimitButtonPages(limit, pageActuel):
    startPage = pageActuel
    endPage = pageActuel

    if endPage < limit:  # set last page that wee can see in the pagination
        if endPage + 2 <= limit:
            endPage += 2
        elif endPage + 1 <= limit:
            endPage += 1

    if startPage > 0:  # set first page that wee can see in the pagination
        if startPage - 2 > 0:
            startPage -= 2
        elif startPage - 1 > 0:
            startPage -= 1

    return [i + 1 for i in range(startPage - 1, endPage, 1)]


def get_current_page(D, LO, NP):
    CP = request.session['current_page']
    if (D == '1') and CP < LO:  # check is direction = 1 and current_page < limit
        CP += 1
    elif (D) == '-1' and CP > 1:  # check is direction = -1 and current_page > limit
        CP -= 1
    else:
        if NP != None and isinstance(NP, int) and 0 < NP < LO + 1:  # check id NextPage not null, is integer and if is in interval [0,limit]
            CP = NP
    request.session['current_page'] = CP
    return CP

def paginaTable(element, term, badges, limit, offset, filtre):
    theTable = request.env['res.partner']
    if not term and not badges:
        badges.append(term)
    if term and term.strip() and not badges:
        badges.append(term)

    for e in element:
        if limit is not None and len(theTable) >= limit:
            break  # Arrête la recherche si la limite est atteinte
        for t in badges:
            eleterm = [(e, 'ilike', t)]
            if filtre == "":
                results = request.env['res.partner'].sudo().search(eleterm, limit=(
                        limit - len(theTable)) if limit is not None and limit > len(theTable) else False, offset=offset)
            else:
                results = request.env['res.partner'].sudo().search(eleterm, order=filtre, limit=(
                        limit - len(theTable)) if limit is not None and limit > len(theTable) else False, offset=offset)
            for res in results:
                if res not in theTable:
                    theTable += res
    return theTable  # Convertissez l'ensemble en liste avant de retourner les résultats
