# -*- coding: utf-8 -*-
# from odoo import http


# class FrontendContact(http.Controller):
#     @http.route('/frontend_contact/frontend_contact', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

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
