# -*- coding: utf-8 -*-
import logging
import pprint
import json
from odoo import fields, http, models
from odoo.http import request
class FrontendContact(http.Controller):
    current_page = 1
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self,**kw):
        _logger = logging.getLogger("frontend_contact.frontend_contact")

        contact_per_page = 10

        direction = request.params.get('direction')

        term = request.params.get('term')

        nextPage = request.params.get('newPage')

        if 'current_page' not in request.session:
            request.session['current_page'] = 1

        current_page = request.session['current_page']

        if request.httprequest.method == 'POST':
            term = request.params['searchBar']

            if 'searchBarInput' not in request.session:
                request.session['searchBarInput'] = term
            if term != request.session['searchBarInput']:
                request.session['searchBarInput'] = term
                current_page = 1

        tableau = (request.env['res.partner'].sudo().search([('name', 'ilike', term)]) or request.env['res.partner'].sudo().search([('mobile', 'ilike', term)]))

        limiteOffset = theLimiteOffset(tableau, contact_per_page)

        if(direction == '1') and current_page < limiteOffset:
            current_page += 1
        elif(direction) == '-1' and current_page > 1:
            current_page -= 1

        if nextPage != None and isinstance(variable, int):
            current_page = int(nextPage)

        offset = (current_page - 1) * contact_per_page

        contact = (request.env['res.partner'].sudo().search([('name', 'ilike', term)], limit=contact_per_page, offset=offset) or
                   request.env['res.partner'].sudo().search([('mobile', 'ilike', term)], limit=contact_per_page,offset=offset))

        pages = LimitButtonPages(limiteOffset+1,current_page)

        request.session['current_page'] = current_page

        return request.render("frontend_contact.list_contact_page", {'contact': contact,
                                                                     'pages': pages,
                                                                     'input_data': term,
                                                                     'current_page': request.session['current_page'],
                                                                     })

def theLimiteOffset(contacts, cpp):
    cpt = 1
    for contact in contacts:
        cpt += 1
    return (cpt/cpp)

def LimitButtonPages(limit,pageActuel):
    startPage = pageActuel
    endPage = pageActuel

    if endPage < limit:
        if endPage + 2 <= limit:
            endPage += 2
        elif endPage + 1 <= limit:
            endPage += 1

    if startPage > 0:
        if startPage - 2 > 0:
            startPage -= 2
        elif startPage - 1 > 0:
            startPage -= 1

    return [i + 1 for i in range(startPage-1, endPage, 1)]
