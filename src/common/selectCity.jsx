import React, { Component } from 'react'

export default class SelectCity extends Component {
    handleChangeProvince = (e) => {
        const value = e.target.value || ''
        const index = value && value.split('_')[1]
        this.setState({
            cityData: [],
            city: ''
        }, () => {
            value && this.setState({
                cityData: this.state.mapData[index].cities,
                province: value.split('_')[0]
            })
        })
    }
    handleChangeCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    handleClickAddCity = () => {
        this.setState({
            targetCity: [...this.state.targetCity, `${this.state.province}-${this.state.city}`]
        })
    }
    handleClickDelCity = (index) => {
        const arr = this.state.targetCity
        arr.splice(index, 1)
        this.setState({
            targetCity: [...arr]
        })
    }
    render() {
        return (
            <div>
                <div className="pl16 pt16">
                    {/* <Checkbox checked={this.state.location_settings.checked} label={'选择城市：'} onChange={(e) => this.handleChangeCheckbox(e)} /> */}
                    选择城市：
                        <div className="select-box-normal d-il mr8">
                        <select name="" id="select" className="c-icon-b" onChange={this.handleChangeProvince}>
                            <option defaultValue=""></option>
                            {
                                this.state.mapData.map((item, index) => {
                                    return (<option value={`${item.province}_${index}`} key={index}>{item.province}</option>)
                                })
                            }
                        </select>
                    </div>
                    <div className="select-box-normal d-il mr8">
                        <select name="" id="select" className="c-icon-b" onChange={this.handleChangeCity}>
                            <option defaultValue=""></option>
                            {
                                this.state.cityData.map((item, index) => {
                                    return (<option value={item} key={index}>{item}</option>)
                                })
                            }
                        </select>
                    </div>
                    <button className="btn-n plr16 ptb8 s0" onClick={this.handleClickAddCity} disabled={!this.state.city}>添加</button>
                </div>
                <div className="pl16 pt8">
                    <div className="w96">已选城市：</div>
                    <div className="pt8">
                        <div className="d-f ac fw">
                            {
                                this.state.targetCity.map((item, index) => {
                                    return (
                                        <div className="btn-hollow p4 mr4 mb4" key={index}>{item}<span onClick={() => this.handleClickDelCity(index)} className="pl4 p-r z9">x</span></div>
                                    )
                                })
                            }
                        </div>
                        {/* <div className="fs12 c-fail pt2">{this.Validator.formatRes('targetCity')}</div> */}
                    </div>
                </div>
            </div>
        )
    }
}
