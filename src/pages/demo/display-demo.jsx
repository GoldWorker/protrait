import React, {
	Component
} from 'react'

class demo extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		const {name,fetchData}=this.props
		return (
			<div>
				{name}
				<button className="tag-text" onClick={()=>fetchData()}>Get Name</button>
			</div>
		)
	}
}

export default demo
