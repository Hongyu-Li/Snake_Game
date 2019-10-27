import React from 'react';
import './Footer.css';

export default class Footer extends React.Component { 
    render() {
        return (
            <div>
                <section className="topic">
                <h3 className="topic-title"><i className="nes-icon star"></i> Core Team Members</h3>
                <div className="coreteam-members">
                    <section className="nes-container is-dark member-card">
                    <div className="avatar">
                        <img alt="Core Member Hongyu Li" className="nes-avatar" src="https://github.com/Hongyu-Li.png?size=80"/>
                    </div>
                    <div className="profile"><h4 className="name">Hongyu Li</h4><p>Algorithm Master</p></div>
                    </section>
                    <section className="nes-container is-dark member-card">
                    <div className="avatar">
                        <img alt="Core Member Jiale Lv" className="nes-avatar" src="https://github.com/Amuro1997.png?size=80"/>
                    </div>
                    <div className="profile"><h4 className="name">Jiale Lv</h4><p>Game Expert</p></div>
                    </section>
                    <section className="nes-container is-dark member-card">
                    <div className="avatar">
                        <img alt="Core Member Jiahuan Yang" className="nes-avatar" src="https://github.com/TokenJan.png?size=80"/>
                    </div>
                    <div className="profile"><h4 className="name">Jiahuan Yang</h4><p>CSS Jedi</p></div>
                    </section>
                </div>
                </section>
                <section className="topic">
                <h3 className="topic-title"><i className="nes-icon heart"></i> Special Thanks</h3>
                <div className="coreteam-members">
                    <section className="nes-container is-dark member-card">
                    <div className="avatar">
                        <img alt="QA Jinhu Peng" className="nes-avatar" src="https://github.com/pjhu.png?size=80"/>
                    </div>
                    <div className="profile"><h4 className="name">Jinhu Peng</h4><p>Machine Learning Killer</p></div>
                    </section>
                    <section className="nes-container is-dark member-card">
                    <div className="avatar">
                        <img alt="Core Member Huan Chen" className="nes-avatar is-rounded" src="https://github.com/codingwesley.png?size=80"/>
                    </div>
                    <div className="profile"><h4 className="name">Huan Chen</h4><p>Demo King</p></div>
                    </section>
                </div>
                </section>
            </div>
        )
    }
}