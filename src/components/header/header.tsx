import { Link } from "react-router-dom"

const Header = () => {
    return <>
        <div className="flex align-center header-flex">
            <div className="flex app-title">
                <h1>Tank Desinger</h1>
                <h3>by Khoshkhonog</h3>
            </div>
            <Link className="header-link" to={'/copyrights'}>
                <h2>For Copyright Holders</h2>
            </Link>
        </div>
    </>
}
export default Header