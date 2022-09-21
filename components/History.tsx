import { THistory } from '../helpers/history'

const HistoryList = ({ history }: { history?: THistory }) => {
    return (
        <div>
            {history?.map((his, index) => {
                const date = new Date(his.createdAt)

                return (
                    <>
                        <div
                            key={index}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <h3 style={{ width: 200 }}>{his.Product.name}</h3>
                            <p style={{ marginLeft: 34, fontSize: '0.8rem', color: '#ccc' }}>{his.orderID}</p>
                            <p style={{ marginLeft: 34 }}>
                                {date.getMonth()} / {date.getDate()} / {date.getFullYear()}
                            </p>
                            <h3 style={{ marginLeft: 34 }}>$ {his.Product.price}</h3>
                        </div>
                        <hr />
                    </>
                )
            })}
        </div>
    )
}

export default HistoryList
