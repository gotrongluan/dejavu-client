import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Parallax } from 'react-parallax';
import { Row, Col, Button } from 'antd';
import Fade from 'react-reveal/Fade';
import Social from 'elements/Social';
import bgImage from 'assets/images/abc.jpg';
import styles from './index.module.less';

const app_socials = [
    {
        type: 'google',
        link: 'mailto:luannguyentrong98@gmail.com&subject=Contact',
    },
    {
        type: 'instagram',
        link: 'https://instagram.com',
    },
    {
        type: 'twitter',
        link: 'https://twitter.com/LuanNguyenTron3',
    },
    {
        type: 'github',
        link: 'https://github.com/luantnguyen',
    },
    {
        type: 'codepen',
        link: 'https://codepen.com'
    },
    {
        type: 'medium',
        link: 'https://medium.com'
    }
];

class Jumpotron extends PureComponent {
    render() {
        const { toggleAffixSider } = this.props;

        return (
            <Row className={styles.jumpotron}>
                <Col span={24}>
                    <Parallax 
                        style={{ width: "100%" }} 
                        strength={0}
                        bgImageStyle={{
                            width: '100%'
                        }}
                        bgImage={bgImage}
                        bgImageAlt="jumptron-bg"
                        blur={0}
                        renderLayer={percent => {
                            return (
                                <div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            background: `rgba(255, 255, 255, 0.6)`,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                </div>
                            );
                        }}
                    >
                        <div style={{ height: 'calc(100vh - 64px)' }}>
                            <div className={styles.inlineDiv}>
                                <Fade>
                                    <div className={styles.title}>Live Stream Video Chat</div>
                                    <div className={styles.slogan}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.
                                    </div>
                                    <div className={styles.social}>
                                        <Row gutter={32}>
                                            {app_socials.map(social => (
                                                <Col span={Math.floor(24 / app_socials.length)} key={social.type}>
                                                    <Social type={social.type} link={social.link}/>
                                                </Col>
                                            ))}
                                        </Row>    
                                    </div>
                                    <div className={styles.tryIt}>
                                        <Link to="/livestream">
                                            <Button type="primary" size="large" icon="api">
                                                Live Stream
                                            </Button>
                                        </Link>
                                        
                                    </div>
                                </Fade>
                            </div>       
                        </div>
                    </Parallax>
                </Col>
            </Row>
        )
    }
}

export default Jumpotron;