import Link from 'next/link'

const Nav = () => {
    return (
        <div style={{ padding: '24px', textAlign: 'right' }}>
            <Link href="/">
                <a style={{ marginRight: '24px' }}>Products</a>
            </Link>
            <Link href="/history">
                <a>History</a>
            </Link>
        </div>
    )
}

export default Nav
