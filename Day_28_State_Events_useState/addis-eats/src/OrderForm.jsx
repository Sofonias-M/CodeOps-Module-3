// import { useState } from "react";

// function OrderForm() {

//     const [form, setForm] = useState({name: "", phone: "", area: "Bole"});
//     const [phone, setPhone] = useState("");
//     const valid = /^(?:\+251|0)9\d{8}$/.test(phone);

//     return (
                
//         function handleChange(e) {
//             const { name, value } = e.target;
//             setForm({ ...form, [name]: value }); // copy, then override
//         }

//         <input name="name" value={form.name} onChange={handleChange} />
//         <input name="phone" value={form.phone} onChange={handleChange} />

        

//         <input value={phone} onChange={e => setPhone(e.target.value)} />

//         {phone && !valid && <p className="err">Use 09… or +2519…</p>}

//         <button disabled={!valid}>Pay with TeleBirr</button>

//     );
// }