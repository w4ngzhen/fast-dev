import {IconProps} from "./IconProps";

export function IconRemove(props: IconProps) {
    return (
        <span onClick={props.onClick}
              style={props.style}
              className={props.className}>
     <svg className="icon"
          width="16px"
          height="16.00px"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
    <path fill="#fff"
          d="M683.514192 1023.999519H340.485808A154.527713 154.527713 0 0 1 186.336081 884.785983L129.317406 325.755552a39.082648 39.082648 0 0 1 77.762111-7.937715l57.053038 559.030431a76.559427 76.559427 0 0 0 76.376161 68.976791h343.005476a76.559427 76.559427 0 0 0 76.376161-68.976791l57.053038-559.030431a39.082648 39.082648 0 1 1 77.762112 7.937715l-57.053039 559.030431A154.516259 154.516259 0 0 1 683.514192 1023.999519zM888.85244 191.513109h-753.681972a39.092957 39.092957 0 0 1 0-78.17446h753.681972a39.092957 39.092957 0 0 1 0 78.17446zM409.199153 704.887365a39.092957 39.092957 0 0 1-39.081502-39.081503V451.991555a39.092957 39.092957 0 0 1 78.174459 0v213.814307a39.092957 39.092957 0 0 1-39.092957 39.081503zM614.789392 704.887365a39.092957 39.092957 0 0 1-39.081502-39.081503V451.991555a39.092957 39.092957 0 0 1 78.174459 0v213.814307a39.092957 39.092957 0 0 1-39.092957 39.081503zM667.844938 171.960904a39.081503 39.081503 0 0 1-39.127319-39.081503 54.773666 54.773666 0 0 0-54.716395-54.716395h-124.048264a54.773666 54.773666 0 0 0-54.716395 54.716395 39.081503 39.081503 0 1 1-78.163006 0 133.028304 133.028304 0 0 1 132.867947-132.867947H574.04704a133.028304 133.028304 0 0 1 132.867947 132.867947 39.070049 39.070049 0 0 1-39.070049 39.081503z"/>
</svg>
    </span>
    )
}