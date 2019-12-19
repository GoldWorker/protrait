import {
    connect
} from 'react-redux'
import {
    fetchData
} from './data-demo.js'
import demo from './display-demo'

const mapStateToProps = (state) => {
    return {
        name: state.demoReducer.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(demo)
