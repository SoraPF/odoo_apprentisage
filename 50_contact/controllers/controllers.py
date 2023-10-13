# -*- coding: utf-8 -*-
# from odoo import http


# class 50Contact(http.Controller):
#     @http.route('/50_contact/50_contact', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/50_contact/50_contact/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('50_contact.listing', {
#             'root': '/50_contact/50_contact',
#             'objects': http.request.env['50_contact.50_contact'].search([]),
#         })

#     @http.route('/50_contact/50_contact/objects/<model("50_contact.50_contact"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('50_contact.object', {
#             'object': obj
#         })
