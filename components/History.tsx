import { THistory } from '../helpers/history'

const HistoryList = ({ history }: { history?: THistory }) => {
    return (
        <div>
            {history?.map((his, index) => {
                const date = new Date(his.created_at)

                return (
                    <>
                        <div
                            key={index}
                            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <h3 style={{ width: 200 }}>{his.Product.name}</h3>

                            <p style={{ marginLeft: 34, fontSize: '0.8rem', color: '#ccc', fontWeight: 'bold' }}>
                                x{his.Paypal.purchase_info.items[0].quantity}
                            </p>
                            <p style={{ marginLeft: 34, fontSize: '0.8rem', color: '#ccc' }}>{his.order_id}</p>
                            <p style={{ marginLeft: 34 }}>
                                {date.getMonth()} / {date.getDate()} / {date.getFullYear()}
                            </p>
                            <h5 style={{ marginLeft: 34 }}>$ {his.Paypal.purchase_info.items[0].unit_amount.value}</h5>
                            <h3 style={{ marginLeft: 34, color: '#ff5050' }}>
                                $ {his.Paypal.purchase_info.amount.breakdown.item_total.value}
                            </h3>
                        </div>

                        <p style={{ color: '#ccc', marginBottom: 0, marginTop: 0 }}>Paid By: </p>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h5 style={{ width: 200, marginTop: 8, marginBottom: 8 }}>
                                {his.Paypal.payer_info?.name?.given_name} {his.Paypal.payer_info?.name?.surname}
                            </h5>
                            <p style={{ marginTop: 0, marginBottom: 0, fontSize: '0.9rem', color: '#ccc' }}>
                                {his.Paypal.payer_info?.email}
                            </p>
                        </div>
                        <hr />
                    </>
                )
            })}
        </div>
    )
}

export default HistoryList
