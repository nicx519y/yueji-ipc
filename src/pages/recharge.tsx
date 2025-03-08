import { useState } from 'react';
import ContentRowContainer from "@/components/ContentRowContainer";
import styles from '@/styles/Recharge.module.css';

const banks = [
    { id: 'icbc', name: '中国工商银行' },
    { id: 'cmb', name: '招商银行' },
    { id: 'abc', name: '中国农业银行' },
    { id: 'ccb', name: '中国建设银行' },
    { id: 'bob', name: '北京银行' },
    { id: 'boc', name: '交通银行' },
    { id: 'xingye', name: '兴业银行' },
    { id: 'nanjing', name: '南京银行' },
    { id: 'minsheng', name: '中国民生银行' },
    { id: 'guangda', name: '光大银行' },
    { id: 'boc', name: '中国银行' },
    { id: 'pingan', name: '平安银行' },
    { id: 'bohai', name: '渤海银行' },
    { id: 'bea', name: '东亚银行' },
    { id: 'ningbo', name: '宁波银行' },
    { id: 'citic', name: '中信银行' },
    { id: 'szdev', name: '深圳发展银行' },
    { id: 'cgb', name: '广发银行' },
    { id: 'shanghai', name: '上海银行' },
    { id: 'spdb', name: '浦发银行' },
    { id: 'post', name: '中国邮政' }
];

const alipay = [
    { id: 'alipay', name: '支付宝' }
];

const tenpay = [
    { id: 'yibao', name: '易宝支付' }
];

const other = [
    { id: 'yidong', name: '中国移动通信' },
    { id: 'liantong', name: '中国联通' },
    { id: 'qib', name: '充值Q币' }
];

export default function Recharge() {
    const [amount, setAmount] = useState('30');
    const [payMethod, setPayMethod] = useState({ id: 'onlineBanking', name: '网上银行' });
    const [selectedBank, setSelectedBank] = useState('');
    const [selectedAlipay, setSelectedAlipay] = useState('');
    const [selectedTenpay, setSelectedTenpay] = useState('');
    const [selectedOther, setSelectedOther] = useState('');

    return (
        <ContentRowContainer numOfCols={1}>
            <div className="bg-white p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-6">在线充值</h1>
                
                <div className={styles.form}>
                    <div className={styles.formItem}>
                        <label>用户名：</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formItem}>
                        <label>密码：</label>
                        <input type="password" className={styles.input} />
                    </div>

                    <div className={styles.formItem}>
                        <label>账号：</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formItem}>
                        <label>确认账号：</label>
                        <input type="text" className={styles.input} />
                    </div>

                    <div className={styles.formItem}>
                        <label>充值金额：</label>
                        <div className={styles.amountOptions}>
                            <label>
                                <input
                                    type="radio"
                                    name="amount"
                                    value="10"
                                    checked={amount === '10'}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                10元
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="amount"
                                    value="30"
                                    checked={amount === '30'}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                30元
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="amount"
                                    value="100"
                                    checked={amount === '100'}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                100元
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="amount"
                                    value="other"
                                    checked={amount === 'other'}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                其它
                            </label>
                        </div>
                    </div>

                    <div className={styles.formItem}>
                        <label>充值方式：</label>
                        <div className={styles.payMethods}>
                            <button 
                                className={`${styles.payMethodBtn} ${payMethod.id === 'onlineBanking' ? styles.active : ''}`}
                                onClick={() => setPayMethod({ id: 'onlineBanking', name: '网上银行' })}
                            >
                                网上银行
                            </button>
                            <button 
                                className={`${styles.payMethodBtn} ${payMethod.id === 'alipay' ? styles.active : ''}`}
                                onClick={() => setPayMethod({ id: 'alipay', name: '支付宝' })}
                            >
                                支付宝
                            </button>
                            <button 
                                className={`${styles.payMethodBtn} ${payMethod.id === 'tenpay' ? styles.active : ''}`}
                                onClick={() => setPayMethod({ id: 'tenpay', name: '财付通' })}
                            >
                                财付通
                            </button>
                            <button 
                                className={`${styles.payMethodBtn} ${payMethod.id === 'other' ? styles.active : ''}`}
                                onClick={() => setPayMethod({ id: 'other', name: '其他方式支付' })}
                            >
                                其他方式支付
                            </button>
                        </div>
                    </div>

                    {payMethod.id === 'onlineBanking' && (
                        <div className={styles.bankList}>
                            {banks.map(bank => (
                                <label key={bank.id} className={styles.bankItem}>
                                    <input
                                        type="radio"
                                        name="bank"
                                        value={bank.id}
                                        checked={selectedBank === bank.id}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                    />
                                    <span>{bank.name}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {payMethod.id === 'tenpay' && (
                        <div className={styles.bankList}>
                            {tenpay.map(tenpay => (
                                <label key={tenpay.id} className={styles.bankItem}>
                                    <input  
                                        type="radio"
                                        name="tenpay"
                                        value={tenpay.id}
                                        checked={selectedTenpay === tenpay.id}
                                        onChange={(e) => setSelectedTenpay(e.target.value)}
                                    />
                                    <span>{tenpay.name}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {payMethod.id === 'alipay' && (
                        <div className={styles.bankList}>
                            {alipay.map(alipay => (
                                <label key={alipay.id} className={styles.bankItem}>
                                    <input  
                                        type="radio"
                                        name="alipay"
                                        value={alipay.id}
                                        checked={selectedAlipay === alipay.id}
                                        onChange={(e) => setSelectedAlipay(e.target.value)}
                                    />
                                    <span>{alipay.name}</span>
                                </label>
                            ))}
                        </div>
                    )}

                    {payMethod.id === 'other' && (
                        <div className={styles.bankList}>
                            {other.map(other => (
                                <label key={other.id} className={styles.bankItem}>
                                    <input  
                                        type="radio"
                                        name="other"
                                        value={other.id}
                                        checked={selectedOther === other.id}
                                        onChange={(e) => setSelectedOther(e.target.value)}
                                    />
                                    <span>{other.name}</span>
                                </label>
                            ))}
                        </div>
                    )}


                    <div className={styles.notice}>
                        <h3>温馨提示</h3>
                        <p>1、充值成功后，充值金额可能会需要一段时间才会出现在您的账号中，请您不要担心，这是正常现象。如果充值失败，请尝试其他充值方式。</p>
                        <p>2、若服务器封停的账号在封停期间对该服务器进行充值，所充金额会被直接转入，并冻结一小时，请在充值前检查是否处于封停状态，以避免一小时内不能使用充值而给您带来不便。</p>
                    </div>

                    <div className={styles.submitBtn}>
                        <button onClick={() => window.location.reload()}>提 交</button>
                    </div>
                </div>
            </div>
        </ContentRowContainer>
    );
} 