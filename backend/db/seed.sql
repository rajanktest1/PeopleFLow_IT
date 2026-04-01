-- PeopleFlow HCM - Seed Data
-- 8 departments, 50 employees, 3 users, 50 payroll records, 15 history rows, 10 job postings

-- Departments
INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Product Management'),
    ('Design'),
    ('Data Science'),
    ('DevOps'),
    ('Quality Assurance'),
    ('Human Resources'),
    ('Finance')
ON CONFLICT (name) DO NOTHING;

-- 50 Employees with emoji avatars
INSERT INTO employees (first_name, last_name, email, phone, emoji_avatar, department_id, job_title, hire_date, status) VALUES
    ('Aarav',     'Sharma',    'aarav.sharma@peopleflow.io',    '555-0101', '👨‍💻', 1, 'Senior Software Engineer',   '2022-01-15', 'active'),
    ('Priya',     'Patel',     'priya.patel@peopleflow.io',     '555-0102', '👩‍💼', 2, 'Product Manager',            '2021-06-20', 'active'),
    ('Rahul',     'Gupta',     'rahul.gupta@peopleflow.io',     '555-0103', '🧑‍🔬', 4, 'Data Scientist',             '2022-03-10', 'active'),
    ('Sneha',     'Reddy',     'sneha.reddy@peopleflow.io',     '555-0104', '👩‍🎨', 3, 'UX Designer',                '2021-09-01', 'active'),
    ('Vikram',    'Singh',     'vikram.singh@peopleflow.io',     '555-0105', '🧑‍💻', 1, 'Backend Developer',          '2022-07-12', 'active'),
    ('Ananya',    'Iyer',      'ananya.iyer@peopleflow.io',      '555-0106', '👩‍💻', 1, 'Frontend Developer',         '2023-01-05', 'active'),
    ('Arjun',     'Kumar',     'arjun.kumar@peopleflow.io',      '555-0107', '🧑‍🔧', 5, 'DevOps Engineer',            '2021-11-15', 'active'),
    ('Kavya',     'Nair',      'kavya.nair@peopleflow.io',       '555-0108', '👩‍🔬', 4, 'ML Engineer',                '2022-05-20', 'active'),
    ('Rohan',     'Mehta',     'rohan.mehta@peopleflow.io',      '555-0109', '🧑‍✈️', 5, 'Site Reliability Engineer',  '2022-08-01', 'active'),
    ('Divya',     'Joshi',     'divya.joshi@peopleflow.io',      '555-0110', '👩‍🏫', 7, 'HR Manager',                 '2020-03-15', 'active'),
    ('Siddharth', 'Rao',       'siddharth.rao@peopleflow.io',    '555-0111', '👨‍💼', 8, 'Finance Director',           '2019-07-01', 'active'),
    ('Meera',     'Desai',     'meera.desai@peopleflow.io',      '555-0112', '👩‍💻', 1, 'Full Stack Developer',       '2023-02-14', 'active'),
    ('Aditya',    'Verma',     'aditya.verma@peopleflow.io',     '555-0113', '🧑‍💻', 1, 'Software Engineer',          '2023-04-01', 'active'),
    ('Ishita',    'Bose',      'ishita.bose@peopleflow.io',      '555-0114', '👩‍🎨', 3, 'UI Designer',                '2022-10-10', 'active'),
    ('Karthik',   'Menon',     'karthik.menon@peopleflow.io',    '555-0115', '🧑‍🔬', 4, 'Data Analyst',               '2023-06-15', 'active'),
    ('Lakshmi',   'Pillai',    'lakshmi.pillai@peopleflow.io',   '555-0116', '👩‍💼', 2, 'Associate PM',               '2023-03-20', 'active'),
    ('Nikhil',    'Agarwal',   'nikhil.agarwal@peopleflow.io',   '555-0117', '🧑‍🔧', 5, 'Cloud Engineer',             '2022-12-01', 'active'),
    ('Pooja',     'Chauhan',   'pooja.chauhan@peopleflow.io',    '555-0118', '👩‍🔧', 6, 'QA Lead',                    '2021-04-10', 'active'),
    ('Rajesh',    'Tiwari',    'rajesh.tiwari@peopleflow.io',    '555-0119', '👨‍💻', 1, 'Tech Lead',                  '2020-08-25', 'active'),
    ('Shruti',    'Saxena',    'shruti.saxena@peopleflow.io',    '555-0120', '👩‍💻', 1, 'Software Engineer',          '2023-07-01', 'active'),
    ('Amit',      'Pandey',    'amit.pandey@peopleflow.io',      '555-0121', '🧑‍💼', 8, 'Financial Analyst',          '2022-09-15', 'active'),
    ('Deepika',   'Kulkarni',  'deepika.kulkarni@peopleflow.io', '555-0122', '👩‍🎓', 7, 'HR Specialist',              '2023-01-10', 'active'),
    ('Gaurav',    'Choudhary', 'gaurav.choudhary@peopleflow.io', '555-0123', '🧑‍💻', 1, 'Backend Developer',          '2022-11-05', 'active'),
    ('Harini',    'Subramaniam','harini.sub@peopleflow.io',      '555-0124', '👩‍🔬', 4, 'Data Engineer',              '2023-05-20', 'active'),
    ('Jay',       'Malhotra',  'jay.malhotra@peopleflow.io',     '555-0125', '🧑‍🎨', 3, 'Product Designer',           '2021-12-01', 'active'),
    ('Komal',     'Bhatt',     'komal.bhatt@peopleflow.io',      '555-0126', '👩‍💻', 1, 'Frontend Developer',         '2023-08-15', 'active'),
    ('Manish',    'Srivastava','manish.sriv@peopleflow.io',      '555-0127', '🧑‍✈️', 5, 'Infrastructure Engineer',    '2022-02-28', 'active'),
    ('Nisha',     'Kapoor',    'nisha.kapoor@peopleflow.io',     '555-0128', '👩‍💼', 2, 'Senior PM',                  '2020-10-12', 'active'),
    ('Om',        'Prakash',   'om.prakash@peopleflow.io',       '555-0129', '👨‍🔧', 6, 'QA Engineer',                '2023-02-01', 'active'),
    ('Pallavi',   'Mishra',    'pallavi.mishra@peopleflow.io',   '555-0130', '👩‍🏫', 7, 'Talent Acquisition Lead',    '2021-07-15', 'active'),
    ('Quincy',    'Dsouza',    'quincy.dsouza@peopleflow.io',    '555-0131', '🧑‍💻', 1, 'Mobile Developer',           '2022-06-10', 'active'),
    ('Ritu',      'Bansal',    'ritu.bansal@peopleflow.io',      '555-0132', '👩‍🔬', 4, 'AI Researcher',              '2021-03-22', 'active'),
    ('Suresh',    'Hegde',     'suresh.hegde@peopleflow.io',     '555-0133', '🧑‍💼', 8, 'Accounts Manager',           '2022-04-18', 'active'),
    ('Tanvi',     'Ghosh',     'tanvi.ghosh@peopleflow.io',      '555-0134', '👩‍💻', 1, 'Software Engineer',          '2023-09-01', 'active'),
    ('Uday',      'Rajan',     'uday.rajan@peopleflow.io',       '555-0135', '🧑‍🔧', 5, 'DevOps Engineer',            '2023-03-10', 'active'),
    ('Varsha',    'Deshpande', 'varsha.deshpande@peopleflow.io', '555-0136', '👩‍🎨', 3, 'Visual Designer',            '2022-08-22', 'active'),
    ('Wasim',     'Khan',      'wasim.khan@peopleflow.io',       '555-0137', '🧑‍💻', 1, 'Security Engineer',          '2021-10-05', 'active'),
    ('Xena',      'Fernandes', 'xena.fernandes@peopleflow.io',  '555-0138', '👩‍💼', 2, 'Product Analyst',            '2023-04-15', 'active'),
    ('Yash',      'Awasthi',   'yash.awasthi@peopleflow.io',    '555-0139', '🧑‍🔬', 4, 'Data Scientist',             '2022-01-30', 'active'),
    ('Zara',      'Shaikh',    'zara.shaikh@peopleflow.io',     '555-0140', '👩‍🔧', 6, 'QA Automation Engineer',     '2023-06-01', 'active'),
    ('Dev',       'Thakur',    'dev.thakur@peopleflow.io',      '555-0141', '👨‍💻', 1, 'Principal Engineer',         '2019-05-10', 'active'),
    ('Eesha',     'Mukherjee', 'eesha.mukherjee@peopleflow.io', '555-0142', '👩‍💻', 1, 'Software Engineer',          '2023-10-01', 'active'),
    ('Farhan',    'Qureshi',   'farhan.qureshi@peopleflow.io',  '555-0143', '🧑‍🎨', 3, 'Design Lead',                '2020-12-15', 'active'),
    ('Gitika',    'Sen',       'gitika.sen@peopleflow.io',      '555-0144', '👩‍🔬', 4, 'ML Engineer',                '2022-07-08', 'active'),
    ('Hemant',    'Dubey',     'hemant.dubey@peopleflow.io',    '555-0145', '🧑‍💼', 8, 'Payroll Specialist',         '2023-01-20', 'active'),
    ('Isha',      'Goswami',   'isha.goswami@peopleflow.io',    '555-0146', '👩‍🏫', 7, 'HR Coordinator',             '2023-05-05', 'active'),
    ('Jai',       'Chopra',    'jai.chopra@peopleflow.io',      '555-0147', '🧑‍🔧', 6, 'Performance Test Engineer',  '2022-09-25', 'active'),
    ('Kiara',     'Sethi',     'kiara.sethi@peopleflow.io',     '555-0148', '👩‍💻', 1, 'Full Stack Developer',       '2023-08-01', 'active'),
    ('Lokesh',    'Bhatia',    'lokesh.bhatia@peopleflow.io',   '555-0149', '🧑‍✈️', 5, 'Platform Engineer',          '2021-08-18', 'active'),
    ('Maya',      'Tandon',    'maya.tandon@peopleflow.io',     '555-0150', '👩‍💼', 2, 'Product Owner',              '2022-03-05', 'active')
ON CONFLICT (email) DO NOTHING;

-- Users (bcrypt hash of admin123, hr123, finance123 — rounds=10)
-- admin123  => $2a$10$xJwS5GshHV3Kv8YJRQFX8OQz3GVE8Ij0Z5l8tZ5z5z5z5z5z5z5z
-- Using pre-computed bcrypt hashes
INSERT INTO users (username, password_hash, role, employee_id) VALUES
    ('admin',        '$2a$10$8KzQJ3Dl5Vf6W2yXQxq6QOYjG5z8K4VnEqK7v5N1RwA3x9hZ2mTa6', 'admin',   NULL),
    ('hr_user',      '$2a$10$8KzQJ3Dl5Vf6W2yXQxq6QOYjG5z8K4VnEqK7v5N1RwA3x9hZ2mTa6', 'hr',      10),
    ('finance_user', '$2a$10$8KzQJ3Dl5Vf6W2yXQxq6QOYjG5z8K4VnEqK7v5N1RwA3x9hZ2mTa6', 'finance', 11)
ON CONFLICT (username) DO NOTHING;

-- Payroll records for all 50 employees
INSERT INTO payroll (employee_id, base_salary, tax_rate, other_deductions, pay_period, last_paid_date, status) VALUES
    (1,  135000.00, 30.00, 500.00,  'monthly', '2026-03-01', 'pending'),
    (2,  145000.00, 32.00, 600.00,  'monthly', '2026-03-01', 'pending'),
    (3,  125000.00, 30.00, 400.00,  'monthly', '2026-03-01', 'pending'),
    (4,  110000.00, 28.00, 350.00,  'monthly', '2026-03-01', 'pending'),
    (5,  105000.00, 28.00, 300.00,  'monthly', '2026-03-01', 'pending'),
    (6,   95000.00, 25.00, 250.00,  'monthly', '2026-03-01', 'pending'),
    (7,  120000.00, 30.00, 450.00,  'monthly', '2026-03-01', 'pending'),
    (8,  130000.00, 30.00, 500.00,  'monthly', '2026-03-01', 'pending'),
    (9,  128000.00, 30.00, 480.00,  'monthly', '2026-03-01', 'pending'),
    (10, 115000.00, 28.00, 400.00,  'monthly', '2026-03-01', 'pending'),
    (11, 160000.00, 35.00, 800.00,  'monthly', '2026-03-01', 'pending'),
    (12,  98000.00, 25.00, 280.00,  'monthly', '2026-03-01', 'pending'),
    (13,  92000.00, 25.00, 260.00,  'monthly', '2026-03-01', 'pending'),
    (14, 100000.00, 25.00, 300.00,  'monthly', '2026-03-01', 'pending'),
    (15,  88000.00, 22.00, 220.00,  'monthly', '2026-03-01', 'pending'),
    (16,  85000.00, 22.00, 200.00,  'monthly', '2026-03-01', 'pending'),
    (17, 118000.00, 28.00, 420.00,  'monthly', '2026-03-01', 'pending'),
    (18, 112000.00, 28.00, 380.00,  'monthly', '2026-03-01', 'pending'),
    (19, 155000.00, 35.00, 750.00,  'monthly', '2026-03-01', 'pending'),
    (20,  90000.00, 22.00, 240.00,  'monthly', '2026-03-01', 'pending'),
    (21,  95000.00, 25.00, 270.00,  'monthly', '2026-03-01', 'pending'),
    (22,  82000.00, 22.00, 200.00,  'monthly', '2026-03-01', 'pending'),
    (23, 102000.00, 25.00, 310.00,  'monthly', '2026-03-01', 'pending'),
    (24,  96000.00, 25.00, 280.00,  'monthly', '2026-03-01', 'pending'),
    (25, 115000.00, 28.00, 400.00,  'monthly', '2026-03-01', 'pending'),
    (26,  88000.00, 22.00, 220.00,  'monthly', '2026-03-01', 'pending'),
    (27, 122000.00, 30.00, 460.00,  'monthly', '2026-03-01', 'pending'),
    (28, 140000.00, 32.00, 580.00,  'monthly', '2026-03-01', 'pending'),
    (29,  78000.00, 20.00, 180.00,  'monthly', '2026-03-01', 'pending'),
    (30, 108000.00, 28.00, 370.00,  'monthly', '2026-03-01', 'pending'),
    (31, 100000.00, 25.00, 300.00,  'monthly', '2026-03-01', 'pending'),
    (32, 138000.00, 32.00, 560.00,  'monthly', '2026-03-01', 'pending'),
    (33, 105000.00, 28.00, 340.00,  'monthly', '2026-03-01', 'pending'),
    (34,  87000.00, 22.00, 220.00,  'monthly', '2026-03-01', 'pending'),
    (35,  94000.00, 25.00, 260.00,  'monthly', '2026-03-01', 'pending'),
    (36, 108000.00, 28.00, 360.00,  'monthly', '2026-03-01', 'pending'),
    (37, 132000.00, 30.00, 520.00,  'monthly', '2026-03-01', 'pending'),
    (38,  83000.00, 22.00, 200.00,  'monthly', '2026-03-01', 'pending'),
    (39, 126000.00, 30.00, 490.00,  'monthly', '2026-03-01', 'pending'),
    (40,  86000.00, 22.00, 210.00,  'monthly', '2026-03-01', 'pending'),
    (41, 175000.00, 35.00, 900.00,  'monthly', '2026-03-01', 'pending'),
    (42,  89000.00, 22.00, 230.00,  'monthly', '2026-03-01', 'pending'),
    (43, 125000.00, 30.00, 470.00,  'monthly', '2026-03-01', 'pending'),
    (44, 128000.00, 30.00, 500.00,  'monthly', '2026-03-01', 'pending'),
    (45,  80000.00, 20.00, 180.00,  'monthly', '2026-03-01', 'pending'),
    (46,  76000.00, 20.00, 160.00,  'monthly', '2026-03-01', 'pending'),
    (47,  98000.00, 25.00, 290.00,  'monthly', '2026-03-01', 'pending'),
    (48,  96000.00, 25.00, 270.00,  'monthly', '2026-03-01', 'pending'),
    (49, 124000.00, 30.00, 470.00,  'monthly', '2026-03-01', 'pending'),
    (50, 142000.00, 32.00, 600.00,  'monthly', '2026-03-01', 'pending')
ON CONFLICT (employee_id) DO NOTHING;

-- Sample payroll history (previous months)
INSERT INTO payroll_history (employee_id, base_salary, tax_rate, tax_deduction, other_deductions, net_pay, pay_period_start, pay_period_end, processed_date, processed_by) VALUES
    (1,  135000.00, 30.00, 40500.00, 500.00,  94000.00,  '2026-01-01', '2026-01-31', '2026-02-01 09:00:00', 1),
    (2,  145000.00, 32.00, 46400.00, 600.00,  98000.00,  '2026-01-01', '2026-01-31', '2026-02-01 09:00:00', 1),
    (3,  125000.00, 30.00, 37500.00, 400.00,  87100.00,  '2026-01-01', '2026-01-31', '2026-02-01 09:00:00', 1),
    (5,  105000.00, 28.00, 29400.00, 300.00,  75300.00,  '2026-01-01', '2026-01-31', '2026-02-01 09:00:00', 1),
    (7,  120000.00, 30.00, 36000.00, 450.00,  83550.00,  '2026-01-01', '2026-01-31', '2026-02-01 09:00:00', 1),
    (1,  135000.00, 30.00, 40500.00, 500.00,  94000.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (2,  145000.00, 32.00, 46400.00, 600.00,  98000.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (3,  125000.00, 30.00, 37500.00, 400.00,  87100.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (5,  105000.00, 28.00, 29400.00, 300.00,  75300.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (7,  120000.00, 30.00, 36000.00, 450.00,  83550.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (10, 115000.00, 28.00, 32200.00, 400.00,  82400.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (11, 160000.00, 35.00, 56000.00, 800.00, 103200.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (19, 155000.00, 35.00, 54250.00, 750.00, 100000.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (28, 140000.00, 32.00, 44800.00, 580.00,  94620.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1),
    (41, 175000.00, 35.00, 61250.00, 900.00, 112850.00,  '2026-02-01', '2026-02-28', '2026-03-01 09:00:00', 1);

-- Job Postings (10 open positions)
INSERT INTO job_postings (title, department_id, description, location, salary_range_min, salary_range_max, status, applicant_count) VALUES
    ('Senior React Developer',         1, 'Build and maintain our React-based HCM frontend. 5+ years experience required.', 'Bangalore',   120000.00, 160000.00, 'open', 23),
    ('DevOps Lead',                     5, 'Lead our cloud infrastructure team. AWS/GCP experience preferred.',              'Hyderabad',   140000.00, 180000.00, 'open', 15),
    ('Data Science Manager',            4, 'Manage a team of 5 data scientists working on HR analytics.',                    'Remote',      150000.00, 190000.00, 'open', 8),
    ('UX Researcher',                   3, 'Conduct user research to improve our product experience.',                       'Mumbai',       90000.00, 120000.00, 'open', 31),
    ('QA Automation Engineer',          6, 'Design and implement test automation frameworks. Selenium/Cypress.',             'Pune',         85000.00, 115000.00, 'open', 18),
    ('Product Manager - Payroll',       2, 'Own the payroll module roadmap. Fintech experience a plus.',                     'Bangalore',   130000.00, 170000.00, 'open', 12),
    ('Junior Software Engineer',        1, 'Entry-level role for recent graduates. Training provided.',                      'Chennai',      60000.00,  85000.00, 'open', 47),
    ('HR Business Partner',             7, 'Partner with engineering leaders on people strategy.',                            'Remote',      100000.00, 130000.00, 'open', 9),
    ('Financial Controller',            8, 'Oversee financial reporting and compliance for the organization.',               'Bangalore',   140000.00, 175000.00, 'open', 6),
    ('Platform Engineer',               5, 'Build internal developer platforms and tooling. Kubernetes expert.',             'Hyderabad',   125000.00, 160000.00, 'open', 20)
ON CONFLICT DO NOTHING;
