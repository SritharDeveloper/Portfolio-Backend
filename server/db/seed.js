const pool = require("./db");

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      description TEXT NOT NULL,
      tag VARCHAR(100),
      stack TEXT[],
      github_url VARCHAR(300),
      live_url VARCHAR(300),
      featured BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      level INTEGER CHECK (level BETWEEN 1 AND 5),
      category VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS experience (
      id SERIAL PRIMARY KEY,
      role VARCHAR(200) NOT NULL,
      company VARCHAR(200) NOT NULL,
      period VARCHAR(100),
      description TEXT,
      sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("✅ Tables created");

  // Seed projects
  await pool.query(`DELETE FROM projects`);
  await pool.query(`
    INSERT INTO projects (title, description, tag, stack, github_url, featured) VALUES
    (
      'Insurance Management System',
      'Enterprise platform for managing insurance policies, clients, premiums, and renewals end-to-end. Built for production use at Xentrix Hitteck Pvt. Limited.',
      'Enterprise',
      ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API'],
      'https://github.com/SritharDeveloper',
      TRUE
    ),
    (
      'Independent Medical Insurance Claim',
      'Self-service portal for patients to submit and track medical insurance claims independently, reducing paperwork and processing delays.',
      'Healthcare',
      ARRAY['Next.js', 'Node.js', 'Express', 'MongoDB'],
      'https://github.com/SritharDeveloper',
      FALSE
    ),
    (
      'College Event Management System',
      'Full-featured platform for organising, registering, and managing college events with admin and student dashboards.',
      'EdTech',
      ARRAY['React', 'Node.js', 'MongoDB', 'Express'],
      'https://github.com/SritharDeveloper',
      FALSE
    );
  `);

  // Seed skills
  await pool.query(`DELETE FROM skills`);
  await pool.query(`
    INSERT INTO skills (name, level, category) VALUES
    ('React.js', 5, 'Frontend'),
    ('JavaScript', 5, 'Frontend'),
    ('HTML / CSS', 5, 'Frontend'),
    ('Next.js', 4, 'Frontend'),
    ('Node.js', 4, 'Backend'),
    ('Express.js', 4, 'Backend'),
    ('REST API Design', 4, 'Backend'),
    ('PostgreSQL', 3, 'Database'),
    ('MongoDB', 4, 'Database');
  `);

  // Seed experience
  await pool.query(`DELETE FROM experience`);
  await pool.query(`
    INSERT INTO experience (role, company, period, description, sort_order) VALUES
    (
      'Full Stack Developer',
      'Xentrix Hitteck Pvt. Limited',
      'Current',
      'Building and maintaining production-grade web applications including an enterprise insurance management platform. Working across the full stack — React frontends, Node/Express APIs, and PostgreSQL databases.',
      1
    );
  `);

  console.log("✅ Seed data inserted");
  pool.end();
};

createTables().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  pool.end();
});
