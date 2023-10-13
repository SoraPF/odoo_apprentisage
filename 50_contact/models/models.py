# -*- coding: utf-8 -*-

from odoo import models, fields, api
from faker import Faker

class newContacts(models.Model):
    _inherit = "res.partner"
    def action_generate_demo_contacts(self):
        faker = Faker()
        for _ in range(50):
            firstName = faker.first_name()
            lastName = faker.last_name()
            self.create({
                'name': firstName + " " + lastName,
                'phone': faker.phone_number(),
                'email': f"{firstName}.{lastName}@test.odoo",
            })
