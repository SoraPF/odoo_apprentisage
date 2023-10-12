# -*- coding: utf-8 -*-
from odoo import http, models
from odoo.http import request


class FrontendContact(http.Controller):
    @http.route('/frontend_contact/contact', website=True, auth='user')
    def index(self, **kw):
        # prendre les données dans contact
        contact = request.env['res.partner'].sudo().search([])
        input_data = kw.get('data')
        print("input_data", input_data)
        return request.render("frontend_contact.list_contact_page", {
            'contact': contact,
            'input_data': input_data
        })

#     @http.route('/frontend_contact/frontend_contact/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('frontend_contact.listing', {
#             'root': '/frontend_contact/frontend_contact',
#             'objects': http.request.env['frontend_contact.frontend_contact'].search([]),
#         })

#     @http.route('/frontend_contact/frontend_contact/objects/<model("frontend_contact.frontend_contact"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('frontend_contact.object', {
#             'object': obj
#         })
