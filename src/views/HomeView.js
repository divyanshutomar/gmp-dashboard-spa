import React from 'react';
import {Link} from 'react-router';
import ChartistGraph from 'react-chartist';

class Pie extends React.Component {
  render() {

    var data = {
	  labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
	  series: [
	    [5, 9, 7, 8, 5],
	    [2, 1, 3.5, 7, 3],
	    [1, 3, 4, 5, 6]
	  ]
	};

    var options = {
	  fullWidth: false,
	  chartPadding: {
	    right: 40
	  }
	}
    var type = 'Line'

    return (
      <div>
        <ChartistGraph className="ct-square" data={data} options={options} type={type} />
      </div>
    )
  }
}

export default class HomeView extends React.Component {
	
    render () {
        return (
            <div>            	
                <h1>Welcome to Admin Dashboard</h1>
            </div>
        );
    }

}
