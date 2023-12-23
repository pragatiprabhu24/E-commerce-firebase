import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

const OrderDetail = () => {
  const context = useContext(AppContext);
  const { order } = context;
  return (
    <div class="flex justify-center bg-gray-100 py-10 p-5">
      <div class="container mr-5 ml-2 mx-auto bg-white shadow-xl">
        <div class="w-11/12 mx-auto">
          <div class="bg-white my-6">
            <table class="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th class="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Sr No
                  </th>
                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Payment Id
                  </th>

                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Customer Name
                  </th>
                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Address
                  </th>
                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Mobile Number
                  </th>
                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Pincode
                  </th>
                  <th class="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, i) => (
                  <tr class="hover:bg-grey-lighter">
                    <td class="py-4 px-6 border-b border-grey-light">
                      {i + 1}
                    </td>
                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.paymentId}
                    </td>

                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.addressInfo.name}
                    </td>
                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.addressInfo.address}
                    </td>
                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.addressInfo.phoneNumber}
                    </td>
                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.addressInfo.pincode}
                    </td>
                    <td class="py-4 px-6 text-center border-b border-grey-light">
                      {item.addressInfo.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
