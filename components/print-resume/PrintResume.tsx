import React from 'react'

import Image from 'next/image'

import avatarPic from '@/public/avatar.jpg'
import { useSiteData } from '@/utils'
import { formatDate, formatPeriod } from '@/utils/date'

import styles from './styles.module.sass'

export const PrintResume: React.FC = () => {
    const data = useSiteData()

    return (
        <div
            id={'print-resume'}
            className={styles.printResume}
            aria-hidden={'true'}
        >
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Image
                        src={avatarPic}
                        alt={data?.biography?.name ?? 'Photo'}
                        width={90}
                        height={90}
                    />
                </div>
                <div className={styles.identity}>
                    <h1 className={styles.name}>{data?.biography?.name}</h1>
                    <p className={styles.titleRole}>{data?.biography?.title}</p>
                    <p className={styles.location}>{data?.biography?.location}</p>
                    <ul className={styles.contactList}>
                        {data?.contactLinks?.map((item) => (
                            <li key={item.icon}>
                                <span className={styles.contactLabel}>{item.label}:</span>{' '}
                                <span className={styles.contactValue}>{item.link}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <p className={styles.summary}>{data?.seo?.experience?.description}</p>

            <div className={styles.body}>
                <div className={styles.experience}>
                    <h2 className={styles.sectionTitle}>{'Experience'}</h2>
                    {data?.experience?.map((item, i) => (
                        <div
                            key={`print-exp-${i}`}
                            className={styles.role}
                        >
                            <div className={styles.roleMeta}>
                                <span className={styles.period}>
                                    {formatDate(item.period?.[0], 'MMM YYYY')}
                                    {' – '}
                                    {item.period?.[1] ? formatDate(item.period?.[1], 'MMM YYYY') : 'Present'}
                                </span>
                                <span className={styles.duration}>{formatPeriod(item.period)}</span>
                            </div>
                            <h3 className={styles.roleTitle}>{item.role}</h3>
                            <p className={styles.duties}>{item.duties}</p>
                            {!!item.skills?.length && (
                                <ul className={styles.skillStack}>
                                    {item.skills.map((skill, j) => (
                                        <li key={`print-exp-${i}-skill-${j}`}>
                                            <strong>{skill.area}:</strong> {skill.stack.join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className={styles.skills}>
                    <h2 className={styles.sectionTitle}>{'Skills'}</h2>
                    {data?.skills?.map((group, i) => (
                        <div
                            key={`print-skill-group-${i}`}
                            className={styles.skillGroup}
                        >
                            <h3 className={styles.skillGroupTitle}>{group.group}</h3>
                            <ul className={styles.skillList}>
                                {group.skills?.map((skill, j) => (
                                    <li
                                        key={`print-skill-${i}-${j}`}
                                        className={styles.skillItem}
                                    >
                                        <span className={styles.skillName}>{skill.name}</span>
                                        <span className={styles.skillBar}>
                                            <span
                                                className={styles.skillFill}
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
