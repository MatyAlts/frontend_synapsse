import Card from "./Card";

export default function CardSection(){
    return(
        <div className="absolute flex flex-row">
            <Card text="Contorno de Ojos" img="/producto2.png" position="right-5"/>
            <Card text="Balsamo Labial" img="/producto1.png" position="right-16"/>
            <Card text="Serum de Acido Hialuronico" img="/producto4.png" position="right-24"/>
        </div>
    )
}