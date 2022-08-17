import React from "react";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { useService } from "@xstate/react";
import {
  service,
  Context,
  BlockchainEvent,
  BlockchainState,
} from "../../machine";

import { Charity as Charities, Donation } from "../../types/contract";

import questionMark from "../../images/ui/expression_confused.png";

import { Button } from "../ui/Button";
import { Panel } from "../ui/Panel";

import arrowUp from "../../images/ui/arrow_up.png";
import arrowDown from "../../images/ui/arrow_down.png";
import "./Charity.css";

interface Props {
  onSelect: (donation: Donation) => void;
}

export const Charity: React.FC<Props> = ({ onSelect }) => {
  const [machineState] = useService<Context, BlockchainEvent, BlockchainState>(
    service
  );

  const [balances, setBalances] = React.useState({
    coolEarthBalance: "",
    waterBalance: "",
    heiferBalance: "",
  });

  const [donation, setDonation] = React.useState<number>(1);

  React.useEffect(() => {
    if (machineState.context.blockChain.isConnected) {
      const load = async () => {
        const balances =
          await machineState.context.blockChain.getCharityBalances();
        setBalances(balances);
      };
      load();
    }
  }, [
    machineState.context.blockChain,
    machineState.context.blockChain.isConnected,
  ]);

  const roundToOneDecimal = (number) => Math.round(number * 10) / 10;

  const handleDonationChange = (event) => {
    setDonation(roundToOneDecimal(event.currentTarget.value));
  };

  const incrementDonation = () => {
    setDonation((prevState) => roundToOneDecimal(prevState + 1));
  };

  const decrementDonation = () => {
    if (donation === 1) {
      setDonation(1);
    } else setDonation((prevState) => roundToOneDecimal(prevState - 1));
  };

  return (
    <Panel>
      <div id="charity-container">
        <span>Donate to play.</span>
        <span id="donate-description">
          To start a farm, please donate to a charity of your choice. Ensure you
          are connected to the Polygon network.
        </span>
        <div id="donation-input-container">
          <input
            type="number"
            step="10.00"
            id="donation-input"
            min={10.00}
            value={donation}
            onChange={handleDonationChange}
          />
          <div id="arrow-container">
            <img
              className="arrow"
              alt="Step up donation value"
              src={arrowUp}
              onClick={incrementDonation}
            />
            <img
              className="arrow"
              alt="Step down donation value"
              src={arrowDown}
              onClick={decrementDonation}
            />
          </div>
        </div>

        <span id="donate-minimum-description">Minimum of $10 MATIC </span>
        <div id="charities">
          {/* <div>
            <div className="charity">Cool Earth</div>
            <span className="charity-description">
              Aim to halt deforestation and its impact on climate change.
            </span>
            <OverlayTrigger
              key="water"
              overlay={(props) => (
                <Tooltip id="tooltip-water" {...props}>
                  {Charities.CoolEarth}
                </Tooltip>
              )}
            >
              <span className="total-donated">
                {balances.coolEarthBalance &&
                  `$${balances.coolEarthBalance} donated`}
              </span>
            </OverlayTrigger>
            <div className="charity-buttons">
              <Button
                onClick={() =>
                  window.open(
                    "https://www.coolearth.org/cryptocurrency-donations/"
                  )
                }
              >
                About
                <img src={questionMark} id="question" />
              </Button>
              <Button
                onClick={() =>
                  onSelect({
                    charity: Charities.CoolEarth,
                    value: donation.toString(),
                  })
                }
              >
                Donate & Play
              </Button>
            </div>
          </div> */}
          <div>
            <div className="charity">Projeye Giriş Ücreti</div>
            <span className="charity-description">
              Oyuna Başlamak İçin Ödemeniz Gereken Miktar.
            </span>
            <OverlayTrigger
              key="water"
              overlay={(props) => (
                <Tooltip id="tooltip-water" {...props}>
                  {Charities.TheWaterProject}
                </Tooltip>
              )}
            >
              <span className="total-donated">
                
              </span>
            </OverlayTrigger>

            <div className="charity-buttons">
              <Button
                onClick={() =>
                  window.open("https://thewaterproject.org/donate-ethereum")
                }
              >
                Hakkımızda
                <img src={questionMark} id="question" />
              </Button>
              <Button
                onClick={() =>
                  onSelect({
                    charity: Charities.TheWaterProject,
                    value: donation.toString(),
                  })
                }
              >
                Play
              </Button>
            </div>
          </div>
         
         
        </div>
      </div>
    </Panel>
  );
};
