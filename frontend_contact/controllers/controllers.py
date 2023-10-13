# -*- coding: utf-8 -*-
import logging
import pprint
import json
from odoo import fields, http, models
from odoo.http import request
class FrontendContact(http.Controller):
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self, **kw):
        # prendre les données dans contact
        contact = request.env['res.partner'].sudo().search([])
        #var pour stoquer plus tard les donnée
        term = ""
        #si y a un requet avec une method = GET
        if request.httprequest.method == 'POST':
            term = request.params['searchBar']#la var data vas stoquer ce que contenais la balise id=searchBar
            #pour mettre dans les log ce que data vaux
            _logger = logging.getLogger("frontend_contact.frontend_contact")
            _logger.info("input_data>>>>>>>>>>>>>>>>>>>>>>>>>> %s", contact)
            #rechercher dans res.patner tous les nom ou tous les mobile qui contient le 'term'
            contact = request.env['res.partner'].sudo().search([('name', 'ilike', term)]) or request.env['res.partner'].sudo().search([('mobile', 'ilike', term)])

            _logger.info("names<<<<<<<<<<<<<<<<: %s", contact)


        #retourner la page html avec les donné venant des variable contact et data
        return request.render("frontend_contact.list_contact_page", {'contact': contact, 'input_data': term})
