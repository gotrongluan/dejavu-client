import React, { PureComponent } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Button, Modal, List, Statistic, Table, Input, Icon } from 'antd';
import AccountWrapper from 'components/AccountWrapper';
import CoinIcon from 'elements/Icon/Coin';
import Spin from 'elements/Spin/Second';
import * as CoinPolicyActions from '_redux/actions/coinPolicy';
import * as TransactionActions from '_redux/actions/transactions';
import { subscribeInfiniteScroll } from 'utils/infiniteScroll';
import { fromNow } from 'utils/utils';
import styles from './index.module.less';


class Coin extends PureComponent {
    state = {
        visibleGetMoreCoinsModal: false,
        money: '',
    }

    componentDidMount() {
        const { fetchTransactions, location } = this.props;
        fetchTransactions();
        this.unsubscibeInfiniteScroll = subscribeInfiniteScroll(location.pathname, () => {
            const { fetchOldTransactions, fetchTransactionsLoading, fetchOldTransactionsLoading } = this.props;
            if (!fetchOldTransactionsLoading && !fetchTransactionsLoading) fetchOldTransactions();
        })
    }

    componentWillUnmount() {
        const { resetCoinPolicy, resetTransactions } = this.props;
        resetCoinPolicy();
        resetTransactions();
        if (this.unsubscibeInfiniteScroll)
            this.unsubscibeInfiniteScroll();
    }

    handleGetMoreCoins = () => {
        this.setState({
            visibleGetMoreCoinsModal: true
        });
        const { coinPolicy } = this.props;
        if (_.isEmpty(coinPolicy)) {
            const { fetchCoinPolicy } = this.props;
            fetchCoinPolicy();
        }
    }

    handleEnterMoney = e => {
        this.setState({
            money: e.target.value,
        });
    }

    handleChange = () => {
        const { money } = this.state;
        if (money !== '') {
            const { buyCoins } = this.props;
            buyCoins(money);
            this.setState({
                money: '',
                visibleGetMoreCoinsModal: false,
            })
        }
    }

    handleCancelChange = () => {
        this.setState({
            visibleGetMoreCoinsModal: false,
            money: ''
        });
    }

    render() {
        const {
            coinPolicy,
            transactions,
            fetchCoinPolicyLoading,
            fetchTransactionsLoading,
            fetchOldTransactionsLoading,
            buyCoinsLoading,
            coin
        } = this.props;

        const columns = [
            {
                key: 'money',
                dataIndex: 'money',
                title: 'Money',
                render: text => <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{text} đ</span>
            },
            {
                key: 'coin',
                dataIndex: 'coin',
                className: 'coin',
                title: 'Coin',
                align: 'center',
                render: text => <span style={{ color: '#91EE1C', fontWeight: 'bold' }}>{text} <CoinIcon size={16} /></span>
            }
        ];

        return (
            <AccountWrapper selectedKey="coin">
                <Row className={styles.coin}>
                    <Row className={styles.title}>Transaction history</Row>
                    <Row className={styles.coinCont}>
                        <div className={styles.balanceCont}>
                            <div className={styles.balance}>
                                <CoinIcon className={styles.icon} size={36} />
                                <span style={{ marginLeft: 8, fontSize: 28, fontWeight: 'bold' }}>{coin}</span>
                            </div>
                            <div className={styles.add}>
                                <Button type="primary" icon="plus" onClick={this.handleGetMoreCoins}>Buy more coins</Button>
                            </div>
                        </div>
                        {(fetchTransactionsLoading || transactions === null) ? (
                            <div className={styles.loadingTrans}>
                                <Spin fontSize={10} />
                            </div>
                        ) : (
                            <div className={styles.transaction}>
                                <List
                                    dataSource={transactions}
                                    rowKey={item => item._id + _.uniqueId("transaction_")}
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
                                {fetchOldTransactionsLoading && (
                                    <div className={styles.oldLoading}>
                                        <Spin fontSize={4} />
                                    </div>
                                )}
                            </div>
                        )}
                        
                    </Row>
                </Row>
                <Modal
                    title="Buy More Coins"
                    visible={this.state.visibleGetMoreCoinsModal}
                    onOk={this.handleChange}
                    onCancel={this.handleCancelChange}
                    okText="Buy"
                    centered
                    maskClosable={false}
                    className={styles.buyCoins}
                >
                    <Row className={styles.modal}>
                        <div className={styles.title}>Conversion table</div>
                        <div>
                            {(fetchCoinPolicyLoading || coinPolicy === null) ? (
                                <div className={styles.loadingPolicy}>
                                    <Spin fontSize={5} />
                                </div>
                            ) : (
                                <Table columns={columns} dataSource={coinPolicy} size="middle" pagination={false} className={styles.table}/>
                            )}
                        </div>
                        <div className={styles.inputCont}>
                            <Input placeholder="Enter money..." value={this.state.money} onChange={this.handleEnterMoney} addonAfter={<Icon type="transaction" />}/>
                        </div>
                    </Row>
                </Modal>
                <Modal title={null} maskClosable={false} closable={false} centered footer={null} visible={buyCoinsLoading} width={150}
                    bodyStyle={{
                        padding: '10px'
                    }}>
                    <div style={{ height: '60px', position: 'relative' }}><Spin fontSize={5} /></div>
                    <div style={{ color: '#91CC1E', textAlign: 'center' }}>Buying coins...</div>
                </Modal>
            </AccountWrapper>
        )
    }
}

const mapStateToProps = ({ loading, transactions, coinPolicy, global: { user } }) => ({
    transactions: transactions,
    coinPolicy: coinPolicy,
    coin: user.coin,
    fetchTransactionsLoading: loading['fetchTransactions'] || false,
    fetchOldTransactionsLoading: loading['fetchOldTransactions'] || false,
    fetchCoinPolicyLoading: loading['fetchCoinPolicy'] || false,
    buyCoinsLoading: loading['buyCoins'] || false,
});

const mapDispatchToProps = dispatch => ({
    fetchTransactions: () => dispatch(TransactionActions.fetchTransactions()),
    fetchOldTransactions: () => dispatch(TransactionActions.fetchOldTransactions()),
    fetchCoinPolicy: () => dispatch(CoinPolicyActions.fetchCoinPolicy()),
    resetTransactions: () => dispatch(TransactionActions.resetTransactions()),
    resetCoinPolicy: () => dispatch(CoinPolicyActions.resetCoinPolicy()),
    buyCoins: money => dispatch(TransactionActions.buyCoins(money)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coin));