/** @format */

const Testimonials = () => {
  return (
    <div className="mt-10">
      <div className="text-center mb-5">
        <h2 className="text-2xl font-semibold">Testimonials</h2>
        <p>The user-friendly interface and excellent customer support have made it easy to integrate into our daily operations. <br /> We have seen a significant increase in productivity and efficiency.</p>
      </div>
      <div className="md:flex mb-5 gap-5 max-w-screen-md mx-auto">
      <div className="space-y-2 p-5 rounded-lg border-2 border-[#66BC89]">
        <div className="w-10">
        <img className="rounded-full" src="https://i.ibb.co/B67h8Q6/christian-buehner-DIt-Ylc26z-VI-unsplash-1.jpg" alt="" />
        </div>
        <h2 className="text-lg font-semibold">Name: Sarah Johnson</h2>
        <h5><span className="font-semibold">Position:</span> Marketing Manager</h5>
        <h6><span className="font-semibold">Company:</span> ABC Corp</h6>
        <p>Using this service has transformed our business. The user-friendly interface and excellent customer support have made it easy to integrate into our daily operations. We have seen a significant increase in productivity and efficiency. Highly recommend!</p>
      </div>
      <div className="space-y-2 p-5 rounded-lg border-2 border-[#66BC89]">
        <div className="w-10">
        <img className="rounded-full" src="https://i.ibb.co/qDkV1GP/jonas-kakaroto-KIPqvv-TOC1s-unsplash.jpg" alt="" />
        </div>
        <h2 className="text-lg font-semibold">Name: Sarah Johnson</h2>
        <h5><span className="font-semibold">Position:</span> Marketing Manager</h5>
        <h6><span className="font-semibold">Company:</span> ABC Corp</h6>
        <p>Using this service has transformed our business. The user-friendly interface and excellent customer support have made it easy to integrate into our daily operations. We have seen a significant increase in productivity and efficiency. Highly recommend!</p>
      </div>
    </div>
    </div>
  );
};

export default Testimonials;
