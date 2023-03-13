import React from 'react';

const Newsletter = () => {
    return (
        <div className="card w-full my-8 rounded-none bg-primary text-black">
            <div className="card-body">
                <h2 className="card-title text-4xl">Get the Power Tools BUY-SELL Newsletter</h2>
                <p>… and receive latest updates about our offers!</p>
                <p>The privacy policy applies.</p>
                <div className="card-actions justify-end">
                    <input type="email" placeholder="Type your email here" className="input input-bordered w-full max-w-xs text-black" />
                    <button className="btn  btn-warning">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;