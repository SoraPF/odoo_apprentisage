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
        #var pour stoquer plus tard les donnée
        contact_per_page = 10
        direction = request.params.get('direction')
        term = request.params.get('term')

        if 'current_page' not in request.session: #cree une valeur dans la session
            request.session['current_page'] = 1

        current_page = request.session['current_page']
        _logger.info("page>>>>>>>>>>>>>>>>>>>>>>>>>> %s", current_page)

        # si y a un requête avec une method = POST
        if request.httprequest.method == 'POST':
            term = request.params['searchBar']  # la var data vas stoquer ce que contenais la balise id=searchBar
            _logger.info("term>>>>>>>>>>>>>>>>>>>>>>>>>> %s", term)
            # creer un session pour gardé en mémoire le term
            if 'searchBarInput' not in request.session:
                request.session['searchBarInput'] = term
            if term != request.session['searchBarInput']:
                request.session['searchBarInput'] = term
                request.session['current_page'] = 1
                current_page = 1

        tableau = (request.env['res.partner'].sudo().search([('name', 'ilike', term)]) or request.env['res.partner'].sudo().search([('mobile', 'ilike', term)]))
        limiteOffset = theLimiteOffset(tableau, contact_per_page)

        _logger.info("limitpage>>>>>>>>>>>>>>>>>>>>>>>>>> %s", limiteOffset)

        if(direction == '1') and current_page < limiteOffset:
            current_page += 1
            request.session['current_page'] += 1
        elif(direction) == '-1' and current_page > 1:
            current_page -= 1
            request.session['current_page'] -= 1

        offset = (current_page - 1) * contact_per_page
                #les contacts qui seront afficher par 10 avec pour contrainte nom ou mobile
        contact = (request.env['res.partner'].sudo().search([('name', 'ilike', term)], limit=contact_per_page, offset=offset) or
                   request.env['res.partner'].sudo().search([('mobile', 'ilike', term)], limit=contact_per_page,offset=offset))

        # pour mettre dans les log ce que data vaux

        _logger.info("contact>>>>>>>>>>>>>>>>>>>>>>>>>> %s", contact)


        #retourner la page html avec les donné venant des variable contact et data
        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'input_data': term})

def theLimiteOffset(contacts, cpp):
    cpt = 1
    for contact in contacts:
        cpt += 1
    return (cpt/cpp)