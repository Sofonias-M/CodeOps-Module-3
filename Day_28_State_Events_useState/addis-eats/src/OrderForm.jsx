import { useState } from "react";

function OrderForm() {

    const [phone, setPhone] = useState("");
    const valid = /^(?:\+251|0)9\d{8}$/.test(phone);

    return (
        <>
            <div className="input-group">
                <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="input-field"
                />
                {phone && !valid && (
                    <p className="err">Use 09… or +2519…</p>
                )}
                <button disabled={!valid} className="submit-btn">Pay with TeleBirr</button>
            </div>
        </>
    );
}

export default OrderForm;