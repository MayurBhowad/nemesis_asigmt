import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import { getData } from '../redux/actions/user.action';


export class Dashboard extends Component {

    componentDidMount() {
        this.props.getData();
    }

    render() {

        const { user, data } = this.props.user;
        let dates = [];
        let comment_counts = [];
        let total_comments = 0;
        let comment_counts_percent = [];
        let numbers = [];

        data.map(user => {
            dates.push(user.comment_created_at);
            comment_counts.push(user.comment_count);
            total_comments = total_comments + user.comment_count;
            numbers.push(user.number)
        })

        comment_counts.map(cn => {
            let count = (100 * cn) / total_comments;
            comment_counts_percent.push(count);
        })

        let pieData = []

        data.map(user => {
            let data = {};
            data.name = user.number;
            data.y = user.comment_count
            pieData.push(data);
        })

        const columnOptions = {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Comments vs Date'
            },
            xAxis: {
                type: "datetime",
                categories: dates
            },
            series: [
                {
                    name: 'comments',
                    data: comment_counts
                }
            ]
        }

        const pieOptions = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser comments by number'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [{
                name: 'Comments',
                colorByPoint: true,
                data: pieData
            }]
        }

        let chart;
        if (user.role === 'admin') {
            chart = (
                <HighchartsReact
                    className="column-chart"
                    highcharts={Highcharts}
                    options={columnOptions}
                />
            )
        } else if (user.role === 'tester') {
            chart = (
                <HighchartsReact
                    className="pie-chart"
                    highcharts={Highcharts}
                    options={pieOptions}
                />
            )
        }

        return (
            <div>
                {chart}

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { getData })(Dashboard)
