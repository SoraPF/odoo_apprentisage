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
        #var pour stoquer plus tard les donnée
        term = ""
        contact_per_page = 10
        direction = int(request.params.get('direction', '0'))

        if 'current_page' not in request.session:
            request.session['current_page'] = 1
        current_page = request.session['current_page']
        if(direction==1):
            current_page+=1
        elif(direction)==-1:
            current_page-=1

        #si y a un requet avec une method = GET
        if request.httprequest.method == 'POST':
            term = request.params['searchBar']#la var data vas stoquer ce que contenais la balise id=searchBar

        #les contacts qui seront afficher par 10
        contact = (request.env['res.partner'].sudo().search([('name', 'ilike', term)], limit=contact_per_page, offset=(current_page - 1) * contact_per_page) or
                   request.env['res.partner'].sudo().search([('mobile', 'ilike', term)], limit=contact_per_page,offset=(current_page - 1) * contact_per_page))

        # pour mettre dans les log ce que data vaux
        _logger = logging.getLogger("frontend_contact.frontend_contact")
        _logger.info("input_data>>>>>>>>>>>>>>>>>>>>>>>>>> %s", contact)
        _logger.info("input_data>>>>>>>>>>>>>>>>>>>>>>>>>> %s", direction)

        #retourner la page html avec les donné venant des variable contact et data
        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'input_data': term})
