import React from 'react'

export default function TableName({tableDataName}) {
  console.log(tableDataName)
  return (
    <div className='flex'>
      <table className='table'>
          <thead>
            <tr>
              <td>ลำดับ</td>
              <td>ชื่อ</td>
              <td>นามสกุล</td>
              <td>แผนก</td>
            </tr>
          </thead>
          <tbody>
            {tableDataName.map((data,index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.department}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}
