# -*- coding: utf-8 -*-
import logging
import pprint
import json
from odoo import fields, http, models
from odoo.http import request
class FrontendContact(http.Controller):
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self,page=1, **kw):
        #var pour stoquer plus tard les donnée
        term = ""

        contact_per_page = 10

        offset = (page - 1) * contact_per_page

        #si y a un requet avec une method = GET
        if request.httprequest.method == 'POST':
            term = request.params['searchBar']#la var data vas stoquer ce que contenais la balise id=searchBar

            #pour mettre dans les log ce que data vaux
            _logger = logging.getLogger("frontend_contact.frontend_contact")
            _logger.info("input_data>>>>>>>>>>>>>>>>>>>>>>>>>> %s", contact)

            #rechercher dans res.patner tous les nom ou tous les mobile qui contient le 'term'

            _logger.info("names<<<<<<<<<<<<<<<<: %s", contact)

        #les contacts qui seront afficher par 10
        contact = (request.env['res.partner'].sudo().search([('name', 'ilike', term)], limit=contact_per_page, offset=offset) or
                   request.env['res.partner'].sudo().search([('mobile', 'ilike', term)], limit=contact_per_page, offset=offset))

        #retourner la page html avec les donné venant des variable contact et data
        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'input_data': term})
