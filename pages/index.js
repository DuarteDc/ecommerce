
import Head from "next/head"
import Footer from "../components/Layouts/Footer"
import Card from "../components/Layouts/Card"
import NavBar from "../components/Layouts/NavBar"
import Slider from "../components/Layouts/Slider"

export default function Home() {
  return (
    <div>
      <NavBar />
      <Slider />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </section>
      <Footer />
    </div>
  )
}
