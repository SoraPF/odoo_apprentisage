# -*- coding: utf-8 -*-
import logging
import pprint
import json
from odoo import fields, http, models
from odoo.http import request
class FrontendContact(http.Controller):
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self,**kw):
        _logger = logging.getLogger("frontend_contact.frontend_contact")

        contact_per_page = 10

        if 'current_page' not in request.session:
            request.session['current_page'] = 1

        current_page = request.session['current_page']

        element = ['name','mobile']
        tableau = infoTable(element,"",None,None)

        pagesOffset = getOffset(tableau, contact_per_page)

        offset = (current_page - 1) * contact_per_page

        contact = infoTable(element,"",contact_per_page,offset)

        pages = LimitButtonPages(pagesOffset+1 ,current_page)

        request.session['current_page'] = current_page


        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'pages': pages})

    @http.route('/frontend_contact/PagesButtons', website=True, auth='user')
    def searchings(self, **kw):
        logger = logging.getLogger("frontend_contact.frontend_contact")
        contact_per_page=10
        current_page = request.session['current_page']
        term = request.params.get('term')
        direction = request.params.get('direction')
        element = ['name', 'mobile']
        nextPage = request.params.get('newPage')
        if nextPage is not None and nextPage != "":
            nextPage = int(nextPage)
        logger.info("current_page>>%s, term>>%s, direction>>%s, nextPage>>%s", current_page, term, direction, nextPage)
        tableau = infoTable(element, term, None, None)

        limitOffset = getOffset(tableau, contact_per_page)

        current_page = get_current_page(direction, current_page, limitOffset, nextPage)

        offset = (current_page - 1) * contact_per_page

        contactTable = infoTable(element, term, contact_per_page, offset)

        pagesOffset = getOffset(tableau, contact_per_page)
        pages = LimitButtonPages(pagesOffset + 1, current_page)
        request.session['current_page'] = current_page
        logger.info("<<<<<<%s>>>>>><<<<<<%s>>>>>>", request.render('frontend_contact.contacts', {'contacts': contactTable}),request.render('frontend_contact.pages',{'pages': pages}))

        contacts_data = request.render('frontend_contact.contacts', {'contacts': contactTable})
        pages_data = request.render('frontend_contact.pages', {'pages': pages})
        data = {
            'contact': contacts_data,
            'pages': pages_data
        }
        return contacts_data

    @http.route('/frontend_contact/pagination/etiquette', website=True, auth='user')
    def searching(self, **kw):
        logger = logging.getLogger("frontend_contact.frontend_contact")
        contact_per_page=10
        current_page = int(request.params.get('page'))
        term = request.params.get('term')
        badge = request.httprequest.args.getlist('badge[]')
        direction = request.params.get('direction')
        element = ['name', 'mobile']
        nextPage = request.params.get('newPage')
        if nextPage is not None and nextPage != "":
            nextPage = int(nextPage)
        logger.info(request.httprequest.args)
        if badge is not None:
            for item in badge:
                logger.info("azer>>> %s",item)
        else:
            logger.info("<<<Est bien du coup non c'est pas trop ça>>>")
        logger.info("current_page>>%s, term>>%s, badge>>%s, direction>>%s, nextPage>>%s", current_page, term, badge, direction, nextPage)
        tableau = infoTable(element, term, None, None)

        limitOffset = getOffset(tableau, contact_per_page)

        current_page = get_current_page(direction, current_page, limitOffset, nextPage)

        offset = (current_page - 1) * contact_per_page

        contactTable = paginaTable(element, term, badge, contact_per_page, offset)

        pagesOffset = getOffset(tableau, contact_per_page)
        pages = LimitButtonPages(pagesOffset + 1, current_page)
        request.session['current_page'] = current_page

        contacts_data = request.render('frontend_contact.contacts', {'contacts': contactTable})
        logger.info("testLog >>> %s, %s",contacts_data, contactTable)
        pages_data = request.render('frontend_contact.pages', {'pages': pages})
        return contacts_data

    @http.route('/frontend_contact/contact/devis', website=True, auth='user')
    def devi(self, **kw):
        cName = request.params.get('name')
        partner = request.env['res.partner'].search([('name','=',cName)])
        if partner:
            devis = request.env['sale.order'].search([('partner_id','=',partner.id)])
            return "Devis associés au contact {}: {}, {}".format(cName, devis.mapped('name'),devis.mapped('user_id').mapped('name'))
        else:
            return "Contact non trouvé"
def getOffset(contacts, cpp):
    cpt = 1
    for contact in contacts: #count how many contact have contacts
        cpt += 1
    return (cpt/cpp)

def LimitButtonPages(limit,pageActuel):
    startPage = pageActuel
    endPage = pageActuel

    if endPage < limit:#set last page that wee can see in the pagination
        if endPage + 2 <= limit:
            endPage += 2
        elif endPage + 1 <= limit:
            endPage += 1

    if startPage > 0:#set first page that wee can see in the pagination
        if startPage - 2 > 0:
            startPage -= 2
        elif startPage - 1 > 0:
            startPage -= 1

    return [i + 1 for i in range(startPage-1, endPage, 1)]

def get_current_page(D, CP, LO, NP):
    if (D == '1') and CP < LO:#check is direction = 1 and current_page < limit
        CP += 1
    elif (D) == '-1' and CP > 1:#check is direction = -1 and current_page > limit
        CP -= 1
    else:
        if NP != None and isinstance(NP, int) and 0 < NP < LO+1:#check id NextPage not null, is integer and if is in interval [0,limit]
            CP = NP
    return CP

def infoTable(element, term, limit, offset):
    theTable = []
    for e in element:
        if limit is not None and len(theTable) >= limit:
            break  # Arrête la recherche si la limite est atteinte
        eleTerm = [(e, 'ilike', term)]
        results = request.env['res.partner'].sudo().search(eleTerm, limit=(limit - len(theTable)) if limit is not None else False, offset=offset)
        theTable += results
    return theTable

def paginaTable(element, term, badges, limit, offset):
    theTable = set()  # Utilisez un ensemble pour stocker les résultats uniques
    badges.append(term)

    for e in element:
        if limit is not None and len(theTable) >= limit:
            break  # Arrête la recherche si la limite est atteinte
        for t in badges:
            eleterm = [(e, 'ilike', t)]
            results = request.env['res.partner'].sudo().search(eleterm, limit=(limit - len(theTable)) if limit is not None else False, offset=offset)
            theTable.update(results)  # Utilisez update() pour ajouter les résultats à l'ensemble

    return list(theTable)  # Convertissez l'ensemble en liste avant de retourner les résultats
