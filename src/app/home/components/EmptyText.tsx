export const EmptyText = ({text = ""}: {text: string}) => {
    const textToShow = text || "No hay valores para mostrar"
    return (
        <div style={{
            width: '100%',
            fontWeight: 'bold',
            color: "#dcd7d6",
            textAlign: 'center'
        }}>
            <p>{textToShow}</p>
        </div>
    )
}