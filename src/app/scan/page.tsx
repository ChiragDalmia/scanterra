import BarcodeScanner from '@/components/barcodeScanner'
import CircularBar from '@/components/circularBar'
import React from 'react'

const Scan = () => {
  return (
    <>
    <BarcodeScanner />
      <CircularBar title={"hello"} percentage={75} size={200} strokeWidth={20} />
    </>
  )
}

export default Scan