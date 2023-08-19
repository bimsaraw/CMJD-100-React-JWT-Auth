import { useParams } from "react-router-dom";

const Item = () => {
    const {id} = useParams();
 
    return (
        <>Item = {id}</>
    )
}

export default Item;