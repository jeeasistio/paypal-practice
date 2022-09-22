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
                            <h3 style={{ marginLeft: 34 }}>
                                $ {his.Paypal.purchase_info.amount.breakdown.item_total.value}
                            </h3>
                        </div>

                        <h5 style={{ color: '#ccc', marginBottom: 0 }}>Payed By: </h5>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h4 style={{ width: 200 }}>
                                {his.Paypal.payer_info?.name?.given_name} {his.Paypal.payer_info?.name?.surname}
                            </h4>
                            <p>{his.Paypal.payer_info?.email}</p>
                        </div>
                        <hr />
                    </>
                )
            })}
        </div>
    )
}

export default HistoryList
