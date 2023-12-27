const Card = (props) => {
    const { variant, extra, children, ...rest } = props;
     
    return (
        <div className={`!z-5 relative flex flex-col rounded-xl border shadow-sm bg-white bg-clip-border ${extra}`}
        {...rest}
        >
            {children}
        </div>
    );
}

export default Card;