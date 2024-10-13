import { Backend, CMS, DevOps, Frontend, SkillsType, Testing } from '@/data/skills'

export type RoleSkillsType = {
    area: string
    stack: SkillsType[]
}

export type ExperienceType = {
    period: string[]
    role: string
    duties: string
    skills?: RoleSkillsType[]
}

export const experience: ExperienceType[] = [
    {
        period: ['09/01//2021'],
        role: 'Senior Frontend Developer',
        duties: 'Developed scalable, modular components for the client application using modern architectural patterns. Designed solutions for key functions such as client-server interactions, REST API integration, and service integrations. Implemented automatic UI tests (unit and integration) to enhance solution quality. Optimized application architecture, including authentication, logging, and data processing. Created and maintained a test environment with tools for screenshot testing and API simulation to streamline development. Contributed to code quality by implementing analysis tools, CI/CD processes, and conducting regular QA sessions. Collaborated with the UI/UX team to enhance UI components and improve application usability.',
        skills: [
            {
                area: 'Frontend',
                stack: [
                    Frontend.JavaScript,
                    Frontend.TypeScript,
                    Frontend.React,
                    Frontend.Redux,
                    Frontend.SASS,
                    Frontend.TailwindCSS,
                    Frontend.Storybook
                ]
            },
            {
                area: 'Backend',
                stack: [Backend.RestAPI, Backend.Go, Backend.PostgreSQL]
            },
            {
                area: 'Testing',
                stack: [Testing.Playwright, Testing.Jest, Testing.RTL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [
                    DevOps.Docker,
                    DevOps.Git,
                    DevOps.Jenkins,
                    DevOps.SonarQube,
                    DevOps.Linux,
                    DevOps.CentsOS,
                    DevOps.GitHubActions
                ]
            }
        ]
    },
    {
        period: ['03/01/2018', '09/01/2024'],
        role: 'Lead Software Engineer',
        duties: 'Led the full development cycle of WordPress sites for media organizations, creating scalable solutions for high-traffic demands. Designed custom PHP modules, optimized MySQL databases, and implemented performance enhancements to ensure reliability. Managed VPS setup, security measures, and ongoing maintenance to safeguard hosting environments. Provided technical support, developed SEO strategies, and integrated social media modules for streamlined content distribution. Additionally, I designed user-friendly WordPress themes, enhancing both functionality and user experience.',
        skills: [
            {
                area: 'Frontend',
                stack: [Frontend.JavaScript, Frontend.jQuery, Frontend.TypeScript, Frontend.HTML, Frontend.CSS]
            },
            {
                area: 'Backend',
                stack: [Backend.PHP, Backend.MySQL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Linux]
            },
            {
                area: 'CMS',
                stack: [CMS.WordPress]
            }
        ]
    },
    {
        period: ['07/01/2021', '11/01/2022'],
        role: 'Senior Frontend Developer',
        duties: "Led the development of a quality assurance portal for microservices, streamlining code and component reviews. Developed a Bitbucket integration API to automate project data extraction and implemented test automation using React Testing Library and Jest for UI testing. Created automated UI tests for over 36 microservices and designed Playwright integration tests. Enhanced CI/CD pipelines with added test and code quality checks. Built a microservice to send test statistics to the quality portal and developed a plugin for test report aggregation with Allure. Contributed to Agile task management, wrote technical documentation, and implemented accessibility testing, while continuously improving the portal's features and functionality. Regularly conducted code reviews to ensure high-quality standards.",
        skills: [
            {
                area: 'Frontend',
                stack: [
                    Frontend.JavaScript,
                    Frontend.TypeScript,
                    Frontend.React,
                    Frontend.Redux,
                    Frontend.SASS,
                    Frontend.SemanticUI
                ]
            },
            {
                area: 'Backend',
                stack: [Backend.RestAPI]
            },
            {
                area: 'Testing',
                stack: [Testing.Playwright, Testing.Jest, Testing.RTL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Jenkins, DevOps.Linux]
            }
        ]
    },
    {
        period: ['08/01/2016', '07/01/2021'],
        role: 'Team Lead Software Engineer',
        duties: 'Developed and integrated a payment system with state-owned banks for federal programs, including cashback initiatives. Led the creation of a COVID-19 control system for the Orenburg region, integrating with government services and implementing an SMS notification API. Managed a development team using Agile and Scrum, overseeing projects like a citizen-government portal for reporting urban issues and an API for e-document integration. Designed and maintained services for receiving charges and regulatory compliance in the Orenburg region, and implemented microservice architecture for government projects. Led fullstack development of portals for publishing legal acts and tax filings, ensuring smooth operations, compliance, and scalability.',
        skills: [
            {
                area: 'Frontend',
                stack: [
                    Frontend.JavaScript,
                    Frontend.TypeScript,
                    Frontend.React,
                    Frontend.Redux,
                    Frontend.CSS,
                    Frontend.HTML,
                    Frontend.SemanticUI
                ]
            },
            {
                area: 'Backend',
                stack: [
                    Backend.RestAPI,
                    Backend.PHP,
                    Backend.MySQL,
                    Backend.PostgreSQL,
                    Backend.Python,
                    Backend.CodeIgniter
                ]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Docker, DevOps.Jenkins, DevOps.Linux]
            }
        ]
    },
    {
        period: ['04/01/2015', '08/01/2016'],
        role: 'Full-Stack Developer',
        duties: 'Led the development of a comprehensive news aggregation system, including a UI for viewing news from multiple sources and an API for banner ad integration. Designed distributed databases for high-load systems and implemented CI/CD pipelines and backup systems. Developed APIs for Facebook user behavior emulation and telecom payment systems. Created a telecom billing system, integrated accounting modules, and developed tools for managing subscriber and payment statistics. Additionally, designed and developed corporate web portals, and provided technical documentation for system administrators and architects.',
        skills: [
            {
                area: 'Frontend',
                stack: [Frontend.JavaScript, Frontend.jQuery, Frontend.CSS, Frontend.HTML]
            },
            {
                area: 'Backend',
                stack: [Backend.RestAPI, Backend.PHP, Backend.MySQL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Linux]
            },
            {
                area: 'CMS',
                stack: [CMS.Drupal, CMS.Joomla, CMS.WordPress]
            }
        ]
    },
    {
        period: ['10/01/2013', '04/01/2015'],
        role: 'Full-Stack Developer',
        duties: 'Led the design and development of the PostgreSQL database for a geographic information system (GIS), optimizing spatial data handling. Developed core GIS components using PHP and Yii, and the mapping subsystem with Delphi, including its UI with JavaScript and jQuery. Built data registry modules and automated scripts to streamline operations. Transitioned the system to a microservices architecture for improved scalability, managed deployment on client servers, and created role-based access models. Provided comprehensive developer and user documentation, and handled server administration for ongoing development and deployment support.',
        skills: [
            {
                area: 'Frontend',
                stack: [Frontend.JavaScript, Frontend.jQuery, Frontend.CSS, Frontend.HTML]
            },
            {
                area: 'Backend',
                stack: [Backend.RestAPI, Backend.PHP, Backend.Yii, Backend.MySQL, Backend.PostgreSQL, Backend.Delphi]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Linux]
            }
        ]
    },
    {
        period: ['07/01/2011', '06/01/2022'],
        role: 'Full-Stack Developer',
        duties: 'Designed and developed the architecture for a custom content management system (CMS) using PHP and Laravel, creating an intuitive administrator interface. Implemented a scalable PostgreSQL database structure and developed various custom modules, including news, articles, and user management. Prototyped MVPs based on client specifications and built APIs for integration with hotel and air ticket booking services. Delivered custom websites on the CMS platform and provided ongoing technical support, including user documentation.',
        skills: [
            {
                area: 'Frontend',
                stack: [Frontend.JavaScript, Frontend.jQuery, Frontend.CSS, Frontend.HTML, Frontend.Bootstrap]
            },
            {
                area: 'Backend',
                stack: [Backend.PHP, Backend.MySQL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Linux]
            }
        ]
    },
    {
        period: ['10/01/2008', '07/01/2011'],
        role: 'Service Engineer',
        duties: 'Installed and configured Local Area Networks (LAN) for residential and commercial clients, ensuring reliable performance. Managed subscriber servers for optimal uptime and security, and installed security systems like alarms and video surveillance for comprehensive protection. Conducted fiber optic splicing and testing for stable connectivity, configured network switches for performance, and administered Linux servers. Provided technical support to clients, resolving network issues and system failures.',
        skills: [
            {
                area: 'Backend',
                stack: [Backend.PHP, Backend.MySQL]
            },
            {
                area: 'CI/CD & DevOps',
                stack: [DevOps.Git, DevOps.Linux, DevOps.CentsOS]
            }
        ]
    },
    {
        period: ['06/01/2005', '12/01/2007'],
        role: 'Computer Hardware Engineer',
        duties: 'Assembled and configured desktop computers, ensuring optimal performance. Performed maintenance and repairs on office equipment, including printers and copiers, to minimize downtime. Refilled printer cartridges to maintain supply and installed Local Area Networks (LAN), including cable installation. Organized network cabinets and configured network switches for efficient traffic management. Diagnosed and repaired hardware and software issues, and developed custom billing software in Delphi to automate invoicing and payment processing.'
    }
]
