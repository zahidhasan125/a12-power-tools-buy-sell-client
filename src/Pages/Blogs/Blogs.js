import React from 'react';

const Blogs = () => {
    return (
        <div className='my-8'>
            <h2 className='text-4xl text-center font-semibold mb-8'>Asked Questions & Answers</h2>
            <div className="collapse w-4/5 mx-auto mb-2 rounded-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-white font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <h4 className='text-2xl'>1. What are the different ways to manage a state in a REACT application?</h4>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <h5 className='text-xl'>* Manage Local State in React</h5>
                    <p>Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it. <br />

                        <code className='bg-slate-400'>useState</code> is the first tool you should reach for to manage state in your components. <br />

                        It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function (without needing optimizations like <code className='bg-slate-400'>useCallback</code> ).</p>
                    <h5 className='text-xl'>* Manage Global State in React</h5>
                    <p>You will reach a point in your application where patterns like “lifting state up” and passing callbacks down to update your state from components lead to lots and lots of props.
                        <br />
                        What do you do if you want to update a component’s state from basically anywhere in your app? You turn it into global state.
                        <br />
                        To manage it, however, you should opt for a third-party solution. Many developers are inclined to use built-in React features like the Context API to manage their state.
                        <br />
                        To be clear: the Context API is not a state management solution. It is a way to avoid problems like props drilling (creating a bunch of props in components that don’t need it), but it is only helpful for reading state, not updating it.
                        <br />
                        The reason to not use Context for global state management lies in the way it works. The default behavior for Context is to re-render all children components if the value provided to it as a prop changes.</p>
                    <h5 className='text-xl'>* Manage Server State in React</h5>
                    <p>
                        Server state can be deceptively challenging to manage. <br />

                        At first, it seems you just need to fetch data and display it in the page. But then you need to display a loading spinner while you are waiting for the data. Then you need to handle errors and display them to the user as they arise. <br />

                        What happens when there is a network error? Do I really need to hit my server every time my user visits the home page if the data hasn’t changed? Do I need to add <code className='bg-slate-400'>useState</code> and <code className='bg-slate-400'>useEffect</code> in every component I want to fetch my data? <br />

                        To fix this, there are a couple of great libraries that make data fetching in React a breeze: <strong>SWR</strong> and <strong>React Query</strong>.
                    </p>
                </div>
            </div>
            <div className="collapse w-4/5 mx-auto mb-2 rounded-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-white font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <h4 className='text-2xl'>2. How does prototypical inheritance work?</h4>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>Every object with its methods and properties contains an internal and hidden property known as [[Prototype]]. The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object.setPrototypeOf. Nowadays, in modern language, it is being set using __proto__.
                    </p>
                </div>
            </div>
            <div className="collapse w-4/5 mx-auto mb-2 rounded-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-white font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <h4 className='text-2xl'>3. What ia a unit test? Why should we write unit test?</h4>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>* A unit test verifies the behavior of a unit of software in the system. It verifies whether a small and isolated piece of the codebase called “unit” behaves as the developer intended. <br />

                        Unit tests verify the smallest parts or components of an application by comparing their actual behavior with the expected behavior in complete isolation. Here, “complete isolation” means that, during unit testing, devs do not connect the application with external dependencies such as databases, the filesystem, or HTTP services. This allows unit tests to be fast and stable since they won’t fail due to problems integrating with those external services.</p> <br />
                    <p className='font-bold'>* Benefits of Unit Tests:</p>
                    <ul className='list-disc'>
                        <li>Unit tests help to find and fix bugs quickly and easily.</li>
                        <li>Unit tests contribute to higher code quality.</li>
                        <li>Unit tests contribute to better application architecture.</li>
                        <li>Unit tests act as documentation.</li>
                    </ul> <br />
                    <p>The main advantage of unit tests is their laser-sharp focus. Since they test a single function, they give precise feedback. If a unit test fails, then in the vast majority of cases testers can be sure that the specific function being tested is the problem. <br />

                        Unit tests are also known for their speed. Since they’re fast, they’re executed more often, making them a source of nearly constant valuable feedback.

                    </p>
                </div>
            </div>
            <div className="collapse w-4/5 mx-auto mb-2 rounded-xl">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-primary text-white font-bold peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <h4 className='text-2xl'>4. Difference among REACT vs Angular vs Vue?</h4>
                </div>
                <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
                    <p>* A comparison between REACT, ANGULAR and VUE are given bellow.</p>
                    <img className='mx-auto' src="https://d2ms8rpfqc4h24.cloudfront.net/uploads/2021/02/Comparative-Analysis-of-Angularjs-vs-ReactJs-vs-VueJs.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Blogs;