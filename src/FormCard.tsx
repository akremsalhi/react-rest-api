

export default function FormCard ({ children }: { children: any }) {
    return (
        <div className="card">
            <div className="card__body">
                { children }
            </div>
        </div>
    )
}