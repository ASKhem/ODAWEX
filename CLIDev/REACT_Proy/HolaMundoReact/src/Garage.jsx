function Car(props) {
    return <li>I am a { props.brand }</li>;
}

function Garage() {
    const marcas= ['Ford', 'BMW', 'Audi'];
    return (
        <>
            <h1>Who lives in my garage?</h1>
            <ul>
                {marcas.map((marca) => <Car key={marca} brand={marca} />)}
            </ul>
        </>
    );
}

export default Garage;
