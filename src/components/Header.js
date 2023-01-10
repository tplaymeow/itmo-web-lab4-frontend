
const Header = ({
    pageName,
    studentName = 'Guliamov Timur',
    studentGroup = 'P32102',
    variant = '15137'
}) => {
    return <div className="header">
        <h2>{pageName}</h2>
        <p><b>Name:</b> {studentName}</p>
        <p><b>Group:</b> {studentGroup}</p>
        <p><b>Variant:</b> {variant}</p>
    </div>
}

export default Header