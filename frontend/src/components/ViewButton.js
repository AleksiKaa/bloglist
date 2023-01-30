const ViewButton = ({ setVisible }) => {
  return (
    <div>
      <button className="viewButton" onClick={() => setVisible(true)}>view</button>
    </div>
  )
}

export default ViewButton