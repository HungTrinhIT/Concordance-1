import React, { Component } from 'react'
import './Table.css'
import {connect} from 'react-redux';
class Table extends Component {
    render() {
        return (
            <div className="source-languege">
        {/* Title language */}
        <p className="language-title">
          <i className="fa fa-language mr-2" />
          English
        </p>
        {/* Table content */}
        <div className="table-content">
          <table className="table table-fixed">
            <thead className="text-center">
              <tr>
                <th className="col-5">Left</th>
                <th className="col-2">Key</th>
                <th className="col-5">Right</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
              <tr>
                <td className="text-right col-5">He managed to say</td>
                <td className="text-center text-danger col-2">hello</td>
                <td className="text-left col-5">
                  to 12 people in five seconds without...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
        )
    }
}

export default connect()(Table);
