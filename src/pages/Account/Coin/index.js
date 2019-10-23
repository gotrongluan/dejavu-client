import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Button, Modal, List, Statistic } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import CoinIcon from 'elements/Icon/Coin';
import TRANSACTIONS from 'assets/faker/transactions';
import 
import { fromNow } from 'utils/utils';
import styles from './index.module.less';


class Coin extends PureComponent {
    render() {
        const transactions = TRANSACTIONS;

        return (
            <AccountWrapper selectedKey="coin">
                <Row className={styles.coin}>
                    <Row className={styles.title}>Transaction history</Row>
                    <Row className={styles.coinCont}>
                        <div className={styles.balanceCont}>
                            <div className={styles.balance}>
                                <CoinIcon className={styles.icon} size={36} />
                                <span style={{ marginLeft: 8, fontSize: 28, fontWeight: 'bold' }}>4096</span>
                            </div>
                            <div className={styles.add}>
                                <Button type="primary" icon="plus">Get more coins</Button>
                            </div>
                        </div>
                        <div className={styles.transaction}>
                            <List
                                dataSource={transactions}
                                rowKey={item => item._id}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <Statistic
                                                value={item.amount}
                                                valueStyle={{
                                                    color: item.amount > 0 ? '#1890ff' : 'red',
                                                    fontSize: 14
                                                }}
                                                suffix="xu"
                                            />
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={<span style={{ fontWeight: 'bold' }}>{item.content}</span>}
                                            description={<span style={{ fontSize: 13, color: 'gray'}}>{ fromNow(item.createdAt) }</span>}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </Row>
                </Row>
                <Modal>

                </Modal>
            </AccountWrapper>
        )
    }
}

const mapStateToProps = ({ loading, transactions, coinPolicy, global: { user } }) => ({
    transactions: transactions,
    coinPolicy: coinPolicy,
    coins: user.coins,
    fetchTransactionsLoading: loading['fetchTransactions'] || false,
    fetchOldTransactionsLoading: loading['fetchOldTransactions'] || false,
    fetchCoinPolicyLoading: loading['fetchCoinPolicy'] || false,
});

const mapDispatchToProps = dispatch => ({
    fetchTransactions: () => dispatch()
})

export default Coin;