import React, { useEffect, useRef } from 'react'
import { Tooltip } from 'bootstrap';

function SocialMedIconGroup() {
    const link1 = useRef(null);
    const link2 = useRef(null);
    const link3 = useRef(null);
    const link4 = useRef(null);
    const link5 = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line
        const tooltip1 = new Tooltip(link1.current, {
            title: "Follow on Facebook"
        });
        // eslint-disable-next-line
        const tooltip2 = new Tooltip(link2.current, {
            title: "Follow on Instagram"
        });
        // eslint-disable-next-line
        const tooltip3 = new Tooltip(link3.current, {
            title: "Follow on Twitter"
        });
        // eslint-disable-next-line
        const tooltip4 = new Tooltip(link4.current, {
            title: "Envíanos un email"
        });
        // eslint-disable-next-line
        const tooltip5 = new Tooltip(link5.current, {
            title: "Follow on LinkedIn"
        });
    }, []);

    return (
        <ul className="navbar-nav me-auto">
            <li className="nav-item">
                <a ref={link1} className="nav-link active" aria-current="page"
                    href="https://www.facebook.com/technisupportSAS/"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Link 1">
                    <i className="bi bi-facebook p-1 icon-link"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                    href="https://www.instagram.com/technisupport/"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Link 2"
                    ref={link2}>
                    <i className="bi bi-instagram p-1 icon-link"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                    href="https://www.instagram.com/technisupport/"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Link 3"
                    ref={link3}>
                    <i className="bi bi-twitter p-1 icon-link"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                    href="mailto:info@technisupport.com"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Link 4"
                    ref={link4}>
                    <i className="bi bi-envelope p-1 icon-link"></i>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                    href="https://www.linkedin.com/company/technisupport-s-a-s-/"
                    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Link 5"
                    ref={link5}>
                    <i className="bi bi-linkedin p-1 icon-link"></i>
                </a>
            </li>
        </ul>
    )
}

export default SocialMedIconGroup