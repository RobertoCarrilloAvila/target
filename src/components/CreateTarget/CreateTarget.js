import useMap from 'hooks/useMap';
import { toast } from "react-toastify";

import TargetsService from 'services/TargetsService';
import FormInput from 'components/FormInput/FormInput';
import FormSelect from 'components/FormSelect/FormSelect';
import target from 'assets/icons/target.svg';
import 'components/CreateTarget/CreateTarget.scss';

const MAX_TARGETS_AMOUNT = 10;

const CreateTarget = ({ onContinue }) => {
  const {
    setMapProperties,
    selectedLocation,
    selectedRadius,
    setTitle,
    topicsList,
    setTopic,
    topic,
    title,
    targets,
  } = useMap();
  const buildTargetRequest = () => ({
    title,
    radius: selectedRadius,
    topic_id: topic,
    latitude: selectedLocation.lat,
    longitude: selectedLocation.lng,
  });

  const createTarget = async (event) => {
    event.preventDefault();
    if (targets.length >= MAX_TARGETS_AMOUNT) {
      toast.error('You has reached the maximum amount of targets');
      return;
    }

    const target = buildTargetRequest();
    const created = await TargetsService.create(target);
    if (created) {
      onContinue('Chat');
    } else {
      alert('Error creating target');
    }
  };

  return (
    <div className="create-target">
      <div className="create-target__container">
        <img src={target} alt="target" className="create-target__icon" />
        <h1 className="create-target__title">create new target</h1>

        <form className="create-target__form" onSubmit={createTarget}>
          <FormInput
            type="number"
            name="radius"
            className="create-target__input"
            label="specify area length"
            required
            onChange={(val) => {
              setMapProperties({
                selectedLocation,
                selectedRadius: parseInt(val),
              });
            }}
            min="1"
          />

          <FormInput
            type="text"
            name="title"
            className="create-target__input"
            label="target title"
            required
            onChange={setTitle}
          />

          <FormSelect
            options={topicsList}
            name="topic"
            className="create-target__input"
            label="select a topic"
            required
            placeholder=""
            onChange={setTopic}
          />

          <button
            type="submit"
            className="create-target__submit btn"
            disabled={!selectedRadius || !title || !topic}
          >
            save target
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTarget;
