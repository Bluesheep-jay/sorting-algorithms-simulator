import React from "react";
import "../styles/AlgoInfo.css";
import { useContext } from "react";
import { ArrayContext } from "../contexts/ArrayContext";

function AlgoInfo() {
  const context = useContext(ArrayContext);

  return (
    <div id="algo-part">
      {context.selectedAlgo === "Selection Sort" ||
      context.selectedAlgo === "" ? (
        <div className="algo-container">
          <h2 className="algo-header">Selection Sort</h2>
          <p className="algo-details">
            Thuật toán Selection sort sắp xếp một mảng bằng cách đi tìm phần tử
            có giá trị nhỏ nhất(giả sử với sắp xếp mảng tăng dần) trong đoạn
            đoạn chưa được sắp xếp và đổi cho phần tử nhỏ nhất đó với phần tử ở
            đầu đoạn chưa được sắp xếp(không phải đầu mảng).
          </p>
          <div className="algo-complexity">
            <ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về thời gian: </span>
              </li>
              <ul>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tốt nhất:</span>
                  <span className="complexity-value"> O(n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Trung bình: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tệ nhất: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
              </ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về không gian:</span>
                <span className="complexity-value"> O(1)</span>
              </li>
            </ul>
          </div>
        </div>
      ) : context.selectedAlgo === "Insertion Sort" ? (
        <div className="algo-container">
          <h2 className="algo-header">Insertion Sort</h2>
          <p className="algo-details">
            Thuật toán Insertion sort duyệt từng phần tử và chèn từng phần tử đó
            vào đúng vị trí trong mảng con(dãy số từ đầu đến phần tử phía trước
            nó) đã sắp xếp sao cho dãy số trong mảng sắp đã xếp đó vẫn đảm bảo
            tính chất của một dãy số tăng dần.
          </p>
          <div className="algo-complexity">
            <ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về thời gian: </span>
              </li>
              <ul>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tốt nhất:</span>
                  <span className="complexity-value"> O(n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Trung bình: </span>
                  <span className="complexity-value">
                  O(n<sup>2</sup>)
                  </span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tệ nhất: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
              </ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về không gian:</span>
                <span className="complexity-value"> O(1)</span>
              </li>
            </ul>
          </div>
        </div>
      ) : context.selectedAlgo === "Bubble Sort" ? (
        <div className="algo-container">
          <h2 className="algo-header">Bubble Sort</h2>
          <p className="algo-details">
            Thuật toán Bubble sort thực hiện lặp lại công việc đổi chỗ 2 số liên
            tiếp nhau nếu chúng đứng sai thứ tự(số sau bé hơn số trước với
            trường hợp sắp xếp tăng dần) cho đến khi dãy số được sắp xếp.
          </p>
          <div className="algo-complexity">
            <ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về thời gian: </span>
              </li>
              <ul>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tốt nhất:</span>
                  <span className="complexity-value"> O(n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Trung bình: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tệ nhất: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
              </ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về không gian:</span>
                <span className="complexity-value"> O(1)</span>
              </li>
            </ul>
          </div>
        </div>
      ) : context.selectedAlgo === "Merge Sort" ? (
        <div className="algo-container">
          <h2 className="algo-header">Merge Sort</h2>
          <p className="algo-details">
            Thuật toán Merge sort hoạt động dựa trên nguyên tắc "chia để trị"
            với ý tưởng chia nhỏ danh sách thành nhiều danh sách con cho đến khi
            mỗi danh sách con bao gồm một phần tử duy nhất và hợp nhất các danh
            sách con đó theo cách tạo thành một danh sách được sắp xếp.
          </p>
          <div className="algo-complexity">
            <ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về thời gian: </span>
              </li>
              <ul>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tốt nhất:</span>
                  <span className="complexity-value"> O(n*log n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Trung bình: </span>
                  <span className="complexity-value"> O(n*log n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tệ nhất: </span>
                  <span className="complexity-value"> O(n*log n)</span>
                </li>
              </ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về không gian:</span>
                <span className="complexity-value"> O(n)</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="algo-container">
          <h2 className="algo-header">Quick Sort</h2>
          <p className="algo-details">
            Thuật toán Quick sort hoạt động dựa trên nguyên tắc "chia để trị",
            chọn một phần tử trong mảng làm điểm đánh dấu (pivot) và sau đó chia
            mảng thành hai mảng con bằng cách so sánh các phần tử trong mảng với
            điểm đánh dấu. Mảng 1 sẽ chứ các phần tử nhỏ hơn hoặc bằng điểm đánh
            dấu và mảng 2 sẽ gồm các phần tử lớn hơn điểm đánh dấu.
          </p>
          <div className="algo-complexity">
            <ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về thời gian: </span>
              </li>
              <ul>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tốt nhất:</span>
                  <span className="complexity-value"> O(n*log n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Trung bình: </span>
                  <span className="complexity-value">O(n*log n)</span>
                </li>
                <li className="time-complexity-item">
                  <span className="complexity-item">Tệ nhất: </span>
                  <span className="complexity-value">
                    O(n<sup>2</sup>)
                  </span>
                </li>
              </ul>
              <li className="algo-info">
                <span className="complexity-item">Độ phức tạp về không gian:</span>
                <span className="complexity-value"> O(n)</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default AlgoInfo;
