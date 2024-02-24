import unittest
from unittest.mock import MagicMock
from Project import Project  # Assuming your Project class is in Project.py

class TestProject(unittest.TestCase):
    def setUp(self):
        self.project = Project()

    def test_get_Projects_failure(self):
        # Mocking the database connection
        db_connection = MagicMock()
        db_connection.send_query.return_value = None  # Simulate no project found
        
        proj_id = 'nonexistent@example.com'
        with self.assertRaises(Exception) as context:
            self.project.get_Projects(proj_id, db_connection)
        self.assertTrue("Project not found" in str(context.exception))

    def test_get_Projects_success(self):
        # Mocking the database connection
        db_connection = MagicMock()
        db_connection.send_query.return_value = {
            'C_Name': 'Test Project',
            'Status': 'Active',
            'Stu_Lead_ID': '12345'
        }

        expected_payload = {
            'message': 'Project Successfully Retrieved!',
            'proj_name': 'Test Project',
            'status': 'Active',
            'stu_lead': '12345',
            'exp': 100 #datetime.utcnow() + timedelta(hours=16)
        }

        proj_id = 'test@example.com'
        payload = self.project.get_Projects(proj_id, db_connection)
        self.assertEqual(payload, expected_payload)

if __name__ == '__main__':
    unittest.main()
